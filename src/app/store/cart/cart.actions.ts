import { createAction, props } from '@ngrx/store';

export const adicionarProduto = createAction(
  '[Carrinho] Adicionar Produto',
  props<{ produto: any }>(),
);
