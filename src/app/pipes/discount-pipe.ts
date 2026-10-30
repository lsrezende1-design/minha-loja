import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, percentual: number): number {
    const precoComDesconto = value * (1 - percentual / 100);

    return Math.round((precoComDesconto + Number.EPSILON) * 100) / 100;
  }
}
