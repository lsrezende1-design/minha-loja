import { DiscountPipe } from './discount-pipe';

describe('DiscountPipe', () => {
  it('create an instance', () => {
    const pipe = new DiscountPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve calcular um desconto de 10%', () => {
    const pipe = new DiscountPipe();

    const resultado = pipe.transform(100, 10);

    expect(resultado).toBe(90);
  });

  it('deve calcular um desconto de 25%', () => {
    const pipe = new DiscountPipe();

    const resultado = pipe.transform(200, 25);

    expect(resultado).toBe(150);
  });

  it('deve arredondar o preço para duas casas decimais', () => {
    const pipe = new DiscountPipe();

    const resultado = pipe.transform(99.99, 15);

    expect(resultado).toBe(84.99);
  });
});
