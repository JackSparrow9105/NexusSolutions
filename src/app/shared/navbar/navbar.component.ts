import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CATEGORIES } from '../product-data';
import { CATALOGUE } from '../catalogue';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;
  activeDropdown: string | null = null;
  isScrolled = false;
  categories = CATEGORIES;
  readonly catalogue = CATALOGUE;

  private get isDesktop(): boolean {
    return window.innerWidth > 992;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) this.activeDropdown = null;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.activeDropdown = null;
  }

  openDropdown(menu: string): void {
    if (this.isDesktop) this.activeDropdown = menu;
  }

  closeDropdown(): void {
    if (this.isDesktop) this.activeDropdown = null;
  }

  // Click/tap on "Company" / "Products" — works on mobile, keyboard and touch-screen laptops
  toggleDropdown(menu: string, event: Event): void {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isDesktop && this.menuOpen) this.closeMenu();
  }
}
