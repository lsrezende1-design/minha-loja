import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selecionarQuantidade } from '../../store/cart/cart.selectors';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private store = inject(Store);

  quantidadeNgRx = this.store.selectSignal(selecionarQuantidade);
}
