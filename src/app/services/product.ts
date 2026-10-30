import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);

  getProducts() {
    return this.http
      .get<{ products: any[] }>('https://dummyjson.com/products?limit=0')
      .pipe(map((resposta) => resposta.products));
  }

  getProductById(id: number) {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }
}
