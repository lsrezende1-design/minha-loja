import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { Store } from '@ngrx/store';
import { adicionarProduto } from '../../store/cart/cart.actions';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DecimalPipe, DiscountPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(Product);
  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store);

  produto: any = null;
  carregando = true;
  erro = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (dadosDaApi) => {
        this.produto = dadosDaApi;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        this.erro = true;
        this.carregando = false;
        this.cdr.markForCheck();

        console.error('Erro ao buscar produto:', erro);
      },
    });
  }
  adicionarAoCarrinho(): void {
    if (this.produto) {
      this.store.dispatch(adicionarProduto({ produto: this.produto }));
    }
  }
}
