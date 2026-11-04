import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const produtoTeste = {
    id: 1,
    title: 'Creme Hidratante',
    price: 100,
    discountPercentage: 10,
    thumbnail: 'https://exemplo.com/produto.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    component.produtoRecebido = produtoTeste;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o nome do produto', () => {
    const elemento = fixture.nativeElement as HTMLElement;

    const titulo = elemento.querySelector('h3');

    expect(titulo?.textContent).toContain('Creme Hidratante');
  });

  it('deve exibir o preço com desconto em reais', () => {
    const elemento = fixture.nativeElement as HTMLElement;

    const texto = (elemento.textContent ?? '').replace(/\s+/g, ' ').trim();

    expect(texto).toContain('R$ 90,00');
  });

  it('deve emitir o produto ao clicar em adicionar ao carrinho', () => {
    const emitir = vi.spyOn(component.adicionar, 'emit');

    const elemento = fixture.nativeElement as HTMLElement;
    const botao = elemento.querySelector('button');

    expect(botao).not.toBeNull();

    botao!.click();

    expect(emitir).toHaveBeenCalledWith(produtoTeste);
  });
});
