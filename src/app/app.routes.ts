import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Checkout } from './pages/checkout/checkout';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'checkout', component: Checkout },
  { path: 'produto/:id', component: ProductDetail },
  { path: '**', redirectTo: '' },
];
