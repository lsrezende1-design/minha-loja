import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { RouterLink } from '@angular/router';
@Component({
  imports: [CurrencyPipe, DecimalPipe, DiscountPipe, RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() produtoRecebido = {
    id: 0,
    title: '',
    price: 0,
    thumbnail: '',
    discountPercentage: 0,
  };
  @Output() adicionar = new EventEmitter<any>();

  clicouComprar() {
    this.adicionar.emit(this.produtoRecebido);
  }
}
