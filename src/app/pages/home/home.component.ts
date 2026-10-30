import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PRODUCTS, ProductSpec } from '../../shared/product-data';
import { openWhatsAppLink } from '../../shared/whatsapp';

interface FeaturedProduct {
  title: string;
  category: string;
  image: string;
  description: string;
  specs: ProductSpec[];
}

interface HeroSlide {
  image: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  // ================= CONTACT FORM =================
  contactForm = {
    name: '',
    email: '',
    mobile: '',
    service: '',
    message: ''
  };

  readonly messageMax = 500;
  serviceOptions: string[] = [];
  errors: { [field: string]: string } = {};
  submitted = false;
  toastMessage = '';
  toastType: 'error' | 'success' = 'error';
  showToast = false;
  private toastTimeout: any;

  constructor(private route: ActivatedRoute) {}

  // ================= VALIDATION =================
  private showToastMessage(msg: string, type: 'error' | 'success' = 'error'): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastMessage = msg;
    this.toastType = type;
    this.showToast = true;
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.toastTimeout = null;
    }, 3500);
  }

  /** Keep only digits; accept "+91 98765 43210" / "098765..." style input and reduce to 10 digits */
  onMobileInput(value: string): void {
    let digits = (value || '').replace(/\D/g, '');
    if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);
    if (digits.length > 10 && digits.startsWith('0')) digits = digits.slice(1);
    this.contactForm.mobile = digits.slice(0, 10);
    if (this.submitted) this.validateForm(false);
  }

  onFieldChange(): void {
    if (this.submitted) this.validateForm(false);
  }

  private validateForm(showToast = true): boolean {
    const errors: { [field: string]: string } = {};
    const name = this.contactForm.name.trim();
    const mobile = this.contactForm.mobile.trim();
    const email = this.contactForm.email.trim();
    const message = this.contactForm.message.trim();

    if (!name) errors['name'] = 'Please enter your full name.';
    else if (name.length < 2) errors['name'] = 'Name looks too short.';
    else if (name.length > 100) errors['name'] = 'Name must be under 100 characters.';

    if (!mobile) errors['mobile'] = 'Please enter your mobile number.';
    else if (!/^[6-9]\d{9}$/.test(mobile)) errors['mobile'] = 'Enter a valid 10-digit Indian mobile number.';

    if (email && email.length > 50) errors['email'] = 'Email address must be under 50 characters.';
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors['email'] = 'Please enter a valid email address.';

    if (message.length > this.messageMax) errors['message'] = `Message must be under ${this.messageMax} characters.`;

    this.errors = errors;
    const first = Object.keys(errors)[0];
    if (first && showToast) {
      this.showToastMessage(errors[first]);
      document.getElementById(first)?.focus();
    }
    return !first;
  }

  private buildEnquiryText(): string {
    const f = this.contactForm;
    const lines = [
      `Name: ${f.name.trim()}`,
      `Mobile: ${f.mobile.trim()}`,
      f.email.trim() ? `Email: ${f.email.trim()}` : '',
      `Service: ${f.service}`,
      f.message.trim() ? `\nMessage:\n${f.message.trim()}` : ''
    ];
    return lines.filter(Boolean).join('\n');
  }

  // ================= WHATSAPP =================
  sendToWhatsApp(): void {
    this.submitted = true;
    if (!this.validateForm()) return;
    openWhatsAppLink(`Hello Nexus Solutions,\n\nI would like to make an inquiry:\n\n${this.buildEnquiryText()}`);
    this.showToastMessage('Opening WhatsApp… just press Send there.', 'success');
  }

  // ================= EMAIL =================
  sendEmail(): void {
    this.submitted = true;
    if (!this.validateForm()) return;
    const subject = encodeURIComponent(`Inquiry from ${this.contactForm.name.trim()}`);
    const body = encodeURIComponent(this.buildEnquiryText());
    // Same tab: window.open on a mailto: link leaves an empty tab behind in most browsers
    window.location.href = `mailto:sales@mynexussolutions.com?subject=${subject}&body=${body}`;
    this.showToastMessage('Opening your email app…', 'success');
  }

  closeToast(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
    this.showToast = false;
  }

  /** "Request Quotation" / "Enquire" buttons: scroll to the form and focus the name field */
  scrollToContact(): void {
    const el = this.nameInput?.nativeElement;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.focus({ preventScroll: true }), 400);
  }

  /** Pre-fill the form when the user came from a specific product */
  private prefillFromProduct(productId: string): void {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    if (this.serviceOptions.includes(product.category)) this.contactForm.service = product.category;
    if (!this.contactForm.message.trim()) {
      this.contactForm.message = `I am interested in ${product.title}. Please share price and availability.`;
    }
  }

  // ================= HERO SLIDER =================
  // ... (unchanged, keep your existing code)
  heroSlides: HeroSlide[] = [
    { image: 'assets/warehouse1.png', label: 'Solar & Lightning Protection' },
    { image: 'assets/manInstallingArrester.png', label: 'Industrial Power Infrastructure' },
    { image: 'assets/LoadingTruck.png', label: 'Industrial Power Infrastructure' },
  ];

  heroSlide = 0;
  slideLabelVisible = false;

  private heroTimer: any;
  private labelTimer: any;

  goToSlide(index: number): void {
    this.heroSlide = index;
    this.flashLabel();
  }

  private flashLabel(): void {
    clearTimeout(this.labelTimer);
    this.slideLabelVisible = true;
    this.labelTimer = setTimeout(() => {
      this.slideLabelVisible = false;
    }, 2400);
  }

  private startHeroTimer(): void {
    this.heroTimer = setInterval(() => {
      this.heroSlide = (this.heroSlide + 1) % this.heroSlides.length;
      this.flashLabel();
    }, 3800);
  }

  // ================= TESTIMONIALS =================
  testimonials = [
    {
      message: 'Excellent service and fast installation. Highly recommended!',
      name: 'Rahul Sharma',
      location: 'Lucknow'
    },
    {
      message: 'Very professional team and great product quality.',
      name: 'Anita Verma',
      location: 'Ayodhya'
    },
    {
      message: 'Saved huge electricity bills after installing solar.',
      name: 'Suresh Yadav',
      location: 'Ghaziabad'
    }
  ];

  currentSlide = 0;

  // ================= LIFECYCLE HOOKS =================
  private testimonialTimer: any;
  private subs: Subscription[] = [];

  ngOnInit(): void {
    const categories = new Set(PRODUCTS.map(p => p.category));
    this.serviceOptions = [
      'All Products',
      ...Array.from(categories).sort(),
      'Other / General Inquiry'
    ];
    this.contactForm.service = this.serviceOptions[0];

    this.subs.push(this.route.queryParams.subscribe(params => {
      if (params['product']) this.prefillFromProduct(params['product']);
      if (params['focus'] === 'name' || params['product']) setTimeout(() => this.scrollToContact(), 300);
    }));
  }

  ngAfterViewInit(): void {
    this.startHeroTimer();
    this.testimonialTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.heroTimer);
    clearInterval(this.testimonialTimer);
    clearTimeout(this.labelTimer);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.subs.forEach(s => s.unsubscribe());
    document.body.style.overflow = '';
  }

  // ================= PRODUCT MODAL =================
  selectedProduct: FeaturedProduct | null = null;

  productDetails: { [key: string]: FeaturedProduct } = {
    earthing: {
      category: 'Earthing Pipes & Rods',
      title: 'Earthing Systems',
      image: 'assets/Products/gi-earthing-electrode.jpg',
      description: 'High-conductivity chemical earthing solutions designed for life-long durability and low resistance.',
      specs: [
        { label: 'Material', value: 'GI, Copper Bonded, or Pure Copper' },
        { label: 'Backfill', value: 'High-quality BFC Compound' },
        { label: 'Standard', value: 'IEEE 80 / IS 3043 Compliant' },
        { label: 'Fault Current Capacity', value: 'Up to 50kA' }
      ]
    },
    lightning: {
      category: 'Lightning Protection',
      title: 'Lightning Arresters',
      image: 'assets/Products/arrester.jpg',
      description: 'Advanced ESE and conventional rods to safeguard structures from direct strikes.',
      specs: [
        { label: 'Protection Radius', value: 'Up to 107 Meters (Level IV)' },
        { label: 'Material', value: 'Stainless Steel 304/316' },
        { label: 'Technology', value: 'ESE (Early Streamer Emission)' },
        { label: 'Testing', value: 'High Voltage Laboratory Tested' }
      ]
    },
    solar: {
      category: 'Solar & BOS',
      title: 'Solar BOS Components',
      image: 'assets/Products/BOS.png',
      description: 'Complete Balance of System kits for residential and commercial solar installations.',
      specs: [
        { label: 'Components', value: 'ACDB, DCDB, MC4 Connectors' },
        { label: 'Enclosure', value: 'IP65/66 Weatherproof' },
        { label: 'Protection', value: 'Built-in SPD and Fuse' },
        { label: 'Compatibility', value: 'Up to 1500V DC Systems' }
      ]
    },
    cables: {
      category: 'Wires & Cables',
      title: 'DC Cables',
      image: 'assets/Products/dcCable.jpg',
      description: 'TUV certified XLPO insulated cables designed for solar power applications.',
      specs: [
        { label: 'Core', value: 'Electrolytic Grade Tinned Copper' },
        { label: 'Life Expectancy', value: '> 25 Years' },
        { label: 'Resistance', value: 'UV, Ozone, Water Resistant' },
        { label: 'Temperature Range', value: '-40°C to +120°C' }
      ]
    }
  };

  openModal(type: string): void {
    this.selectedProduct = this.productDetails[type];
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }

  enquireFromModal(product: FeaturedProduct): void {
    if (this.serviceOptions.includes(product.category)) this.contactForm.service = product.category;
    if (!this.contactForm.message.trim()) {
      this.contactForm.message = `I am interested in ${product.title}. Please share details and a quotation.`;
    }
    this.closeModal();
    setTimeout(() => this.scrollToContact(), 50);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedProduct) this.closeModal();
  }
}
