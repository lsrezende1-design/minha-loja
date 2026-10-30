import { createReducer, on } from '@ngrx/store';
import { adicionarProduto, removerProduto, clearCart } from './cart.actions';

export interface CartState {
  itens: any[];
}

export const estadoInicial: CartState = {
  itens: [],
};

export const cartReducer = createReducer(
  estadoInicial,

  on(adicionarProduto, (estado, { produto }) => ({
    ...estado,
    itens: [...estado.itens, produto],
  })),

  on(removerProduto, (estado, { id }) => {
    const indice = estado.itens.map((produto) => produto.id).lastIndexOf(id);

    if (indice === -1) {
      return estado;
    }

    return {
      ...estado,
      itens: estado.itens.filter((_, i) => i !== indice),
    };
  }),

  on(clearCart, (estado) => ({
    ...estado,
    itens: [],
  })),
);
