import { describe, it, expect } from 'vitest';
import { cartReducer, estadoInicial } from './cart.reducer';
import { adicionarProduto, removerProduto, clearCart } from './cart.actions';

describe('CartReducer', () => {
  it('deve iniciar com o carrinho vazio', () => {
    expect(estadoInicial.itens).toEqual([]);
  });
});

it('deve adicionar um produto ao carrinho', () => {
  const produto = {
    id: 1,
    title: 'Produto de teste',
    price: 50,
  };

  const novoEstado = cartReducer(estadoInicial, adicionarProduto({ produto }));

  expect(novoEstado.itens.length).toBe(1);
  expect(novoEstado.itens[0]).toEqual(produto);
});

it('deve remover apenas uma unidade do produto', () => {
  const produto = {
    id: 1,
    title: 'Produto de teste',
    price: 50,
  };

  const estadoComDoisProdutos = {
    itens: [produto, produto],
  };

  const novoEstado = cartReducer(estadoComDoisProdutos, removerProduto({ id: 1 }));

  expect(novoEstado.itens.length).toBe(1);
  expect(novoEstado.itens[0]).toEqual(produto);
});

it('deve esvaziar o carrinho ao finalizar a compra', () => {
  const produto = {
    id: 1,
    title: 'Produto de teste',
    price: 50,
  };

  const estadoComProdutos = {
    itens: [produto, produto],
  };

  const novoEstado = cartReducer(estadoComProdutos, clearCart());

  expect(novoEstado.itens).toEqual([]);
});
it('não deve modificar o estado original ao adicionar um produto', () => {
  const produto = {
    id: 1,
    title: 'Produto de teste',
    price: 50,
  };

  const estadoOriginal = {
    itens: [],
  };

  const novoEstado = cartReducer(estadoOriginal, adicionarProduto({ produto }));

  expect(estadoOriginal.itens).toEqual([]);
  expect(novoEstado.itens).toEqual([produto]);
  expect(novoEstado).not.toBe(estadoOriginal);
});
