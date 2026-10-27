import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selecionarQuantidade } from '../../store/cart/cart.selectors';
import { clearCart } from '../../store/cart/cart.actions';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private store = inject(Store);

  quantidadeNgRx = this.store.selectSignal(selecionarQuantidade);
  esvaziarCarrinho() {
    this.store.dispatch(clearCart());
  }
}
