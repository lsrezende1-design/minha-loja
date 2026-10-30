import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { adicionarProduto, clearCart, removerProduto } from '../../store/cart/cart.actions';
import {
  selecionarItens,
  selecionarItensAgrupados,
  selecionarQuantidade,
  selecionarTotal,
} from '../../store/cart/cart.selectors';
import { DiscountPipe } from '../../pipes/discount-pipe';
@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DiscountPipe],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  itensCarrinho = this.store.selectSignal(selecionarItens);
  itensAgrupados = this.store.selectSignal(selecionarItensAgrupados);
  quantidadeItens = this.store.selectSignal(selecionarQuantidade);
  totalCompra = this.store.selectSignal(selecionarTotal);
  aumentarQuantidade(produto: any): void {
    this.store.dispatch(adicionarProduto({ produto }));
  }

  pedidoConcluido = signal(false);
  resumoCompra = signal<{
    nome: string;
    email: string;
    quantidade: number;
    total: number;
    produtos: { nome: string; quantidade: number }[];
  } | null>(null);

  checkoutForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],
    numero: ['', [Validators.required, Validators.pattern(/^(?:\d+|S\/N)$/i)]],
    complemento: [''],
    cidade: ['', [Validators.required, Validators.minLength(2)]],
    estado: ['', [Validators.required]],
    pagamento: ['cartao', [Validators.required]],
    numeroCartao: [
      '',
      [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^\d{16}$/),
      ],
    ],

    codigoSeguranca: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/^\d{3}$/),
      ],
    ],
  });
  isCampoInvalido(campo: string) {
    const controle = this.checkoutForm.get(campo);
    return !!(controle && controle.invalid && (controle?.dirty || controle?.touched));
  }

  finalizarPedido(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.quantidadeItens() === 0) {
      return;
    }

    const dados = this.checkoutForm.value;

    this.resumoCompra.set({
      nome: dados.nome,
      email: dados.email,
      quantidade: this.quantidadeItens(),
      total: this.totalCompra(),
      produtos: this.itensAgrupados().map((produto) => ({
        nome: produto.title,
        quantidade: produto.quantidade,
      })),
    });

    this.pedidoConcluido.set(true);

    this.store.dispatch(clearCart());

    this.checkoutForm.reset({
      pagamento: 'cartao',
    });
  }
  removerDoCarrinho(id: number): void {
    this.store.dispatch(removerProduto({ id }));
  }
}
