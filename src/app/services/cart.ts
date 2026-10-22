import { Service, signal } from '@angular/core';

@Service()
export class Cart {
  itens: any[] = [];

  quantidade = signal(0);

  adicionar(produto: any) {
    this.itens.push(produto);
    this.quantidade.set(this.itens.length);
  }

  obterQuantidade() {
    return this.itens.length;
  }
}
