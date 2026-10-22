import { Component, inject, OnInit } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../services/product';
import { Cart } from '../../services/cart';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(Product);
  private cartService = inject(Cart);

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

        console.log('Produtos recebidos:', dadosDaApi);
      },
      error: (erro) => {
        this.carregando = false;
        this.erro = true;

        console.error('Erro ao carregar produtos:', erro);
      },
    });
  }

  receberProduto(produto: any) {
    this.cartService.adicionar(produto);

    console.log('Produto adicionado:', produto.title);
    console.log('Quantidade no carrinho:', this.cartService.obterQuantidade());
  }
}
