import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS, Product } from '../../shared/product-data';
import { openWhatsAppLink } from '../../shared/whatsapp';

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

  openModal(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  openWhatsAppForProduct(product?: Product): void {
    const message = product ? `Hello, I'm interested in ${product.title}. Please provide a quote.` : 'Hello, I would like a quote.';
    openWhatsAppLink(message);
  }
}
