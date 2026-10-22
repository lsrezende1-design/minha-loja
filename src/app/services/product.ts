import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Product {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<any[]>('https://fakestoreapi.com/products');
  }
}
