import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../product-data';

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
  productsMenu = PRODUCTS;

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

  downloadBrochure(): void {
    const link = document.createElement('a');
    link.href = 'assets/Nexus_Solutions_Company_Profile.pdf';
    link.download = 'Nexus_Solutions_Company_Profile.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
