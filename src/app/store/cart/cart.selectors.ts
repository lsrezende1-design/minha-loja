import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selecionarCarrinho = createFeatureSelector<CartState>('carrinho');

export const selecionarQuantidade = createSelector(
  selecionarCarrinho,
  (estado) => estado.itens.length,
);

export const selecionarItens = createSelector(selecionarCarrinho, (estado) => estado.itens);

export const selecionarTotal = createSelector(selecionarItens, (itens) =>
  itens.reduce((total, produto) => {
    const precoComDesconto = produto.price * (1 - produto.discountPercentage / 100);

    const precoArredondado = Math.round((precoComDesconto + Number.EPSILON) * 100) / 100;

    return total + precoArredondado;
  }, 0),
);

export const selecionarItensAgrupados = createSelector(selecionarItens, (itens) => {
  const agrupados: ((typeof itens)[number] & { quantidade: number })[] = [];

  itens.forEach((produto) => {
    const existente = agrupados.find((item) => item.id === produto.id);

    if (existente) {
      existente.quantidade++;
    } else {
      agrupados.push({
        ...produto,
        quantidade: 1,
      });
    }
  });

  return agrupados;
});
