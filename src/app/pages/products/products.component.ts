import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PRODUCTS, Product } from '../../shared/product-data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  selectedProduct: Product | null = null;
  products: Product[] = PRODUCTS;

  constructor(private router: Router) {}

  openModal(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  // Navigate to home page and focus the contact form
  goToContactForm(product?: Product): void {
    this.router.navigate(['/'], { fragment: 'contact', queryParams: { focus: 'name' } });
  }
}