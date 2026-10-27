import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCart } from '../../store/cart/cart.actions';
import { selecionarCarrinho, selecionarQuantidade } from '../../store/cart/cart.selectors';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  pedidoConcluido = signal(false);

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

    this.pedidoConcluido.set(true);

    this.store.dispatch(clearCart());

    this.checkoutForm.reset({
      nome: '',
    });
  }
}
