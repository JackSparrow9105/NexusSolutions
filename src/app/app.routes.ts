import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  // Any unknown URL (old links, typos) goes back to the home page instead of crashing the router
  { path: '**', redirectTo: '' }
];
