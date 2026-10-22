import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { Store } from '@ngrx/store';
import { adicionarProduto } from '../../store/cart/cart.actions';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(Product);
  private cartService = inject(Cart);
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  produtos: any[] = [];
  carregando = true;
  erro = false;

  ngOnInit(): void {
    this.carregando = true;
    this.erro = false;

    this.productService.getProducts().subscribe({
      next: (dadosDaApi) => {
        this.produtos = dadosDaApi;
        this.carregando = false;
        this.erro = false;
        this.cdr.markForCheck();

        console.log('Produtos recebidos:', dadosDaApi);
      },
      error: (erro) => {
        this.carregando = false;
        this.erro = true;
        this.cdr.markForCheck();

        console.error('Erro ao carregar produtos:', erro);
      },
    });
  }

  receberProduto(produto: any) {
    this.store.dispatch(adicionarProduto({ produto }));

    console.log('Produto enviado ao NgRx:', produto.title);
  }
}
