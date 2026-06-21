import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../product-data';
import { openWhatsAppLink } from '../whatsapp';

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

  toggleMenu(close = false) {
    this.menuOpen = close ? false : !this.menuOpen;
    if (!this.menuOpen) this.activeDropdown = null;
  }

  openDropdown(menu: string) {
    if (window.innerWidth > 992) this.activeDropdown = menu;
  }

  closeDropdown() {
    if (window.innerWidth > 992) this.activeDropdown = null;
  }

  toggleDropdown(menu: string, event: Event) {
    if (window.innerWidth <= 992) {
      event.stopPropagation();
      this.activeDropdown = this.activeDropdown === menu ? null : menu;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  openWhatsApp(): void {
    openWhatsAppLink('Hello, I would like a quote.');
  }

  downloadBrochure(): void {
    // Replace with your actual PDF file path
    const pdfUrl = 'assets/Products/Nexus_Solutions_Brochure-1.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Nexus_Solutions_Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}