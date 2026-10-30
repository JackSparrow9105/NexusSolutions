import { Component, HostListener, OnDestroy } from '@angular/core';
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
export class ProductsComponent implements OnDestroy {
  selectedProduct: Product | null = null;
  products: Product[] = PRODUCTS;

  constructor(private router: Router) {}

  openModal(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  // Go to the home page contact form; when a product is given, the form is pre-filled with it
  goToContactForm(product?: Product): void {
    this.closeModal();
    const queryParams = product ? { product: product.id } : { focus: 'name' };
    this.router.navigate(['/'], { fragment: 'contact', queryParams });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedProduct) this.closeModal();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}