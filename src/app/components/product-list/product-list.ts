import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../services/product';
import { Store } from '@ngrx/store';
import { adicionarProduto } from '../../store/cart/cart.actions';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  imports: [ProductCard, ReactiveFormsModule],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(Product);
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  produtos: any[] = [];
  carregando = true;
  erro = false;
  campoBusca = new FormControl('', { nonNullable: true });

  produtosFiltrados: any[] = [];

  categoriaSelecionada = 'todos';

  categoriasPrincipais = [
    {
      nome: 'Beleza e cuidados',
      id: 'beleza',
      categorias: ['beauty', 'fragrances', 'skin-care'],
    },
    {
      nome: 'Moda',
      id: 'moda',
      categorias: ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes', 'tops'],
    },
    {
      nome: 'Casa e decoração',
      id: 'casa',
      categorias: ['furniture', 'home-decoration', 'kitchen-accessories', 'groceries'],
    },
    {
      nome: 'Tecnologia',
      id: 'tecnologia',
      categorias: ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
    },
    {
      nome: 'Acessórios e outros',
      id: 'acessorios',
      categorias: [
        'mens-watches',
        'womens-watches',
        'womens-bags',
        'womens-jewellery',
        'sunglasses',
        'sports-accessories',
        'motorcycle',
        'vehicle',
      ],
    },
  ];

  ngOnInit(): void {
    this.carregando = true;
    this.erro = false;

    this.productService.getProducts().subscribe({
      next: (dadosDaApi) => {
        this.produtos = dadosDaApi;

        this.filtrarProdutos();

        this.carregando = false;
        this.erro = false;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        this.carregando = false;
        this.erro = true;
        this.cdr.markForCheck();

        console.error('Erro ao carregar produtos:', erro);
      },
    });
    this.campoBusca.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => {
      this.filtrarProdutos();
    });
  }
  filtrarProdutos(): void {
    const busca = this.campoBusca.value.toLowerCase().trim();

    const grupoSelecionado = this.categoriasPrincipais.find(
      (grupo) => grupo.id === this.categoriaSelecionada,
    );

    this.produtosFiltrados = this.produtos.filter((produto) => {
      const correspondeBusca = produto.title.toLowerCase().includes(busca);

      const correspondeCategoria =
        this.categoriaSelecionada === 'todos' ||
        (grupoSelecionado?.categorias.includes(produto.category) ?? false);

      return correspondeBusca && correspondeCategoria;
    });

    this.cdr.markForCheck();
  }
  receberProduto(produto: any) {
    this.store.dispatch(adicionarProduto({ produto }));

    console.log('Produto enviado ao NgRx:', produto.title);
  }
  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.filtrarProdutos();
  }
}
