# Minha Loja - Trabalho Final Angular I

Este projeto é uma aplicação de e-commerce desenvolvida como trabalho de conclusão do módulo **Angular I**, pertencente ao curso **Dev Front-end - I** do programa **CAIXAVERSO - FC4**, ministrado pela **Ada Tech**.

O objetivo central da aplicação é implementar uma loja virtual moderna, utilizando os conceitos fundamentais do Angular, incluindo componentização, serviços, rotas, pipes customizados e gerenciamento de estado reativo para o carrinho de compras.

---

## Autores e Divisão de Responsabilidades

A concepção, os testes do sistema e a validação final das integrações foram realizadas de forma conjunta e colaborativa pela equipe. As frentes principais de trabalho foram organizadas da seguinte forma:

- **Lilian Siqueira Rezende**

  Responsável por liderar a arquitetura técnica do projeto e a configuração do ecossistema Angular (`app.config.ts` e `app.routes.ts`), conduzindo o desenvolvimento da lógica dos modelos de dados (`iproduct.ts`) e a criação central do serviço de produtos (`product.ts`), além de coordenar a implementação dos componentes da vitrine e página de detalhes (`product-card` e `product-detail`) e a integração de ponta a ponta entre as rotas e serviços de dados da aplicação.

- **Fabyo Luiz Crizóstomo Kock**

  Responsável pela implementação da lógica do gerenciamento de estado do carrinho de compras na pasta `store/cart/`, pela criação das ações (`cart.actions.ts`), reducers (`cart.reducer.ts`) e seletores (`cart.selectors.ts`) do estado reativo, pelo desenvolvimento, dentre outras coisas, da persistência do carrinho e sua integração ao serviço (`cart.ts`), além da construção da página de checkout (`pages/checkout/`), conectando a lista de compras ao fluxo de finalização.

- **Werlleyn Douglas Assunção Santos**

  Responsável pelo desenvolvimento do pipe customizado de desconto (`pipes/discount-pipe.ts`) e sua aplicação visual na loja, pelo apoio na estruturação da grade principal de listagem de produtos (`product-list/`), pela elaboração dos arquivos de testes unitários (`.spec.ts`) dos serviços e componentes do projeto, além do alinhamento das estilizações globais (`styles.css`) e revisão dos arquivos de configuração da aplicação.

---

## Informações Acadêmicas

- **Instituição:** Ada Tech
- **Programa:** CAIXAVERSO - FC4
- **Curso:** Dev Front-end - I
- **Módulo:** Angular I

---

## Funcionalidades

- **Listagem de Produtos:** Exibição dinâmica da vitrine de produtos com cards reutilizáveis.
- **Detalhes do Produto:** Visualização de informações detalhadas de cada item.
- **Carrinho de Compras:** Gerenciamento reativo do carrinho (adição, remoção e atualização de itens).
- **Página de Checkout:** Resumo final dos itens selecionados e simulação de finalização da compra.
- **Transformação de Dados (Pipes):** Pipe customizado para aplicação e visualização de descontos.
- **Layout Responsivo:** Cabeçalho, rodapé e área principal estruturados para diferentes tamanhos de tela.

---

## Tecnologias Utilizadas

- **[Angular](https://angular.dev/):** Framework principal para desenvolvimento da SPA.
- **[TypeScript](https://www.typescriptlang.org/):** Linguagem base para tipagem estática e lógica.
- **[HTML5 / CSS3](https://developer.mozilla.org/):** Estruturação e estilização da interface.
- **[RxJS / NgRx (State Store)](https://ngrx.io/):** Gerenciamento centralizado de estado para o carrinho de compras.
- **[Jasmine / Karma](https://jasmine.github.io/):** Suíte de testes unitários.

---

## Arquitetura do Projeto

Abaixo está a estrutura de arquivos e diretórios da aplicação:

```text
minha-loja-trabalho-final/
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    ├── app/
    │   ├── app.config.ts          # Configurações globais da aplicação
    │   ├── app.routes.ts          # Definição das rotas da aplicação
    │   ├── app.ts                 # Componente raiz
    │   ├── app.html
    │   ├── app.css
    │   ├── components/            # Componentes reutilizáveis de interface
    │   │   ├── footer/            # Rodapé da aplicação
    │   │   ├── header/            # Cabeçalho da aplicação
    │   │   ├── product-card/      # Card individual do produto
    │   │   ├── product-detail/    # Detalhes do produto
    │   │   └── product-list/      # Grade de listagem dos produtos
    │   ├── models/                # Interfaces e tipos de dados
    │   │   └── iproduct.ts        # Modelo do produto
    │   ├── pages/                 # Páginas (Views principais da aplicação)
    │   │   ├── checkout/          # Página de finalização de compra
    │   │   └── home/              # Página principal / Vitrine
    │   ├── pipes/                 # Formatações e transformações customizadas
    │   │   └── discount-pipe.ts   # Pipe para cálculo/exibição de desconto
    │   ├── services/              # Serviços de lógica de negócio e consumo de dados
    │   │   ├── cart.ts            # Serviço do carrinho
    │   │   └── product.ts         # Serviço de produtos
    │   └── store/                 # Gerenciamento de estado (Store)
    │       └── cart/              # Estado do carrinho de compras
    │           ├── cart.actions.ts
    │           ├── cart.reducer.ts
    │           └── cart.selectors.ts
    └── public/
        └── favicon.ico
```

---

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, garante que você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Angular CLI](https://angular.dev/cli) (`npm install -g @angular/cli`)

### Passo a passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/minha-loja-trabalho-final.git
   cd minha-loja-trabalho-final
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

3. **Executar a aplicação em modo de desenvolvimento:**

   ```bash
   ng serve
   ```

   Ou via npm:

   ```bash
   npm start
   ```

4. **Acessar a aplicação:**
   Abra o seu navegador e acesse `http://localhost:4200/`.

---

## Executando os Testes

Para rodar a suíte de testes unitários:

```bash
ng test
```

---

## Licença

Este projeto foi desenvolvido estritamente para fins acadêmicos e didáticos como parte do programa **CAIXAVERSO - FC4 / Ada Tech**.
