import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<{ products: IProduct[] }>('https://dummyjson.com/products?limit=0')
      .pipe(map((resposta) => resposta.products));
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://dummyjson.com/products/${id}`);
  }
}
