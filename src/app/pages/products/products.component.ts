import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PRODUCTS, CATEGORIES, Product, ProductCategory, getCategory } from '../../shared/product-data';

type Tab = 'all' | ProductCategory['id'];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  readonly categories = CATEGORIES;
  readonly totalCount = PRODUCTS.length;

  activeTab: Tab = 'all';
  visibleProducts: Product[] = PRODUCTS;
  selectedProduct: Product | null = null;

  private sub?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ?category=earthing opens that tab (used by navbar, footer and home popups)
    this.sub = this.route.queryParamMap.subscribe(params => {
      const id = params.get('category');
      this.applyTab(id && getCategory(id) ? (id as Tab) : 'all');
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.body.style.overflow = '';
  }

  get activeCategory(): ProductCategory | undefined {
    return this.activeTab === 'all' ? undefined : getCategory(this.activeTab);
  }

  countFor(id: ProductCategory['id']): number {
    return PRODUCTS.filter(p => p.category === id).length;
  }

  categoryName(product: Product): string {
    return getCategory(product.category)?.name ?? '';
  }

  selectTab(tab: Tab): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: tab === 'all' ? null : tab },
      replaceUrl: true
    });
  }

  private applyTab(tab: Tab): void {
    this.activeTab = tab;
    this.visibleProducts = tab === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === tab);
  }

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

  trackById(_: number, p: Product): string {
    return p.id;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedProduct) this.closeModal();
  }
}
