import { createReducer, on } from '@ngrx/store';
import { adicionarProduto, clearCart } from './cart.actions';

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
  on(clearCart, (estado) => ({
    ...estado,
    itens: [],
  })),
);
