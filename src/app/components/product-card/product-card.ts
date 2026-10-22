import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
@Component({
  imports: [CurrencyPipe, DiscountPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() produtoRecebido = {
    id: 0,
    title: '',
    price: 0,
    image: '',
  };
  @Output() adicionar = new EventEmitter<any>();

  clicouComprar() {
    this.adicionar.emit(this.produtoRecebido);
  }
}
