import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { Product } from './product';
import { IProduct } from '../models/iproduct';

describe('Product', () => {
  let service: Product;
  let httpMock: HttpTestingController;

  // Objeto simplificado para estes testes.
  // A conversão de tipo não valida todos os campos da interface.
  const produtoSimulado = {
    id: 1,
    title: 'Perfume',
    price: 100,
  } as IProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(Product);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar e extrair a lista de produtos', () => {
    service.getProducts().subscribe((produtos) => {
      expect(produtos).toEqual([produtoSimulado]);
    });

    const requisicao = httpMock.expectOne('https://dummyjson.com/products?limit=0');

    expect(requisicao.request.method).toBe('GET');

    requisicao.flush({
      products: [produtoSimulado],
      total: 1,
      skip: 0,
      limit: 1,
    });
  });

  it('deve buscar um produto pelo ID', () => {
    service.getProductById(1).subscribe((produto) => {
      expect(produto).toEqual(produtoSimulado);
    });

    const requisicao = httpMock.expectOne('https://dummyjson.com/products/1');

    expect(requisicao.request.method).toBe('GET');

    requisicao.flush(produtoSimulado);
  });
});
