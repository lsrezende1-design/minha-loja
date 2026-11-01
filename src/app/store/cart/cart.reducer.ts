import { createReducer, on } from '@ngrx/store';
import { adicionarProduto, removerProduto, clearCart } from './cart.actions';

export interface CartState {
  itens: any[];
}

const STORAGE_KEY = 'minha_loja_carrinho';

function carregarEstadoInicial(): CartState {
  if (typeof window !== 'undefined') {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      try {
        return { itens: JSON.parse(salvo) };
      } catch (e) {
        console.error('Erro ao fazer parse do carrinho do localStorage', e);
      }
    }
  }
  return { itens: [] };
}

function salvarEstado(estado: CartState): CartState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado.itens));
    } catch (e) {
      console.error('Erro ao salvar o carrinho no localStorage', e);
    }
  }
  return estado;
}

export const estadoInicial: CartState = carregarEstadoInicial();

export const cartReducer = createReducer(
  estadoInicial,

  on(adicionarProduto, (estado, { produto }) => {
    const novoEstado = {
      ...estado,
      itens: [...estado.itens, produto],
    };
    return salvarEstado(novoEstado);
  }),

  on(removerProduto, (estado, { id }) => {
    const indice = estado.itens.map((produto) => produto.id).lastIndexOf(id);

    if (indice === -1) {
      return estado;
    }

    const novoEstado = {
      ...estado,
      itens: estado.itens.filter((_, i) => i !== indice),
    };
    return salvarEstado(novoEstado);
  }),

  on(clearCart, (estado) => {
    const novoEstado = {
      ...estado,
      itens: [],
    };
    return salvarEstado(novoEstado);
  }),
);
