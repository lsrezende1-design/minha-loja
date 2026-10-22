import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selecionarCarrinho = createFeatureSelector<CartState>('carrinho');

export const selecionarQuantidade = createSelector(
  selecionarCarrinho,
  (estado) => estado.itens.length,
);
