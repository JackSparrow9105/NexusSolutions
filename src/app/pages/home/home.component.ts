import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PRODUCTS, CATEGORIES, ProductCategory, Product, getCategory, productsInCategory } from '../../shared/product-data';
import { openWhatsAppLink } from '../../shared/whatsapp';
import { CATALOGUE } from '../../shared/catalogue';
import { ReviewsMapComponent } from '../../components/reviews-map/reviews-map.component';

interface HeroSlide {
  /** base name in assets/hero/ – each image exists as -800, -1600 and -2400.webp */
  name: string;
  label: string;
  /** which part of the photo stays visible when phones crop it (CSS object-position) */
  focus?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReviewsMapComponent],
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
  readonly catalogue = CATALOGUE;
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
    window.location.href = `mailto:info@mynexussolutions.in?subject=${subject}&body=${body}`;
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
    const categoryName = getCategory(product.category)?.name;
    if (categoryName && this.serviceOptions.includes(categoryName)) this.contactForm.service = categoryName;
    if (!this.contactForm.message.trim()) {
      this.contactForm.message = `I am interested in ${product.title}. Please share price and availability.`;
    }
  }

  // ================= HERO SLIDER =================
  heroSlides: HeroSlide[] = [
    { name: 'factory', label: 'Earthing & Lightning Protection Products' },
    { name: 'solar', label: 'Solar BOS & Power Infrastructure', focus: '60% center' },
    { name: 'lightning', label: 'Lightning Protection & Earthing', focus: '76% 62%' },
  ]

  heroSrc(slide: HeroSlide, size: 800 | 1600 | 2400): string {
    return `assets/hero/${slide.name}-${size}.webp`;
  }

  heroSlide = 0;
  slideLabelVisible = false;
  /** slides 2 & 3 start downloading only after the first one is on screen */
  restOfSlidesReady = false;

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
      message: 'Excellent Product Quality ⭐⭐⭐⭐⭐\nWe recently installed Nexus Solutions chemical earthing material at our facility. The product quality is excellent, and the overall experience has been very satisfying. Highly recommended for reliable earthing solutions.',
      name: 'Venkat Kanna',
      location: 'Trichy'
    },
    {
      message: 'Reliable Lightning Protection ⭐⭐⭐⭐⭐\nWe are very happy with the lightning arrester supplied by Nexus Solutions. The product quality, finishing and technical support were impressive. A reliable partner for electrical safety solutions.',
      name: 'S David',
      location: 'Chennai'
    }, {
      message: 'Professional Service ⭐⭐⭐⭐⭐\nFrom product selection to installation support, Nexus Solutions provided excellent service. Their team is knowledgeable, professional and cooperative. We are satisfied with their products and services.',
      name: 'Saravanan',
      location: 'Vijayawada'
    }, 
     {
      message: 'Dependable ⭐⭐⭐⭐⭐\nNexus Solutions has provided us with dependable earthing and lightning protection products. Their professional approach and commitment to customer satisfaction make them a good choice.',
      name: 'R Vijay',
      location: 'Coimbatore'
    },
     {
      message: 'Recommended for Industrial Projects ⭐⭐⭐⭐⭐\nWe used Nexus Solutions products for our industrial electrical safety requirements. The products were properly finished, well-packed and delivered professionally. We look forward to working with them again.',
      name: 'Krishnamoorthy',
      location: 'Salem'
    },
     {
      message: 'Excellent Customer Support ⭐⭐⭐⭐⭐\nReally impressed with the customer support from Nexus Solutions. Their team helped us select the right earthing and lightning protection materials for our requirements. Great coordination and service.',
      name: 'Karthik',
      location: 'Hyderabad'
    },
     {
      message: 'Value for Money ⭐⭐⭐⭐⭐\nGood product quality at competitive pricing. We installed Nexus Solutions earthing materials and lightning arresters at our project site and are satisfied with the overall supply and support.' ,
      name: 'Bharath',
      location: 'Bengaluru'
    },
     {
      message: 'Trusted Energy Solutions Partner ⭐⭐⭐⭐⭐\nNexus Solutions நிறுவனத்திடமிருந்து Chemical Earthing Material மற்றும் Lightning Arrester வாங்கி எங்கள் திட்டத்தில் நிறுவியுள்ளோம். பொருட்களின் தரம் மிகவும் சிறப்பாக உள்ளது. நிறுவனத்தின் சேவை, சரியான நேரத்தில் டெலிவரி மற்றும் தொழில்நுட்ப ஆதரவு அனைத்தும் பாராட்டத்தக்கது. மின்சார பாதுகாப்பு மற்றும் எர்திங் தேவைகளுக்கு Nexus Solutions ஒரு சிறந்த தேர்வு. நிச்சயமாக மற்றவர்களுக்கும் பரிந்துரைக்கிறோம்!',
      name: 'R. Joseph',
      location: 'Kerala'
    } 
  ];

  currentSlide = 0;

  // ================= LIFECYCLE HOOKS =================
  private testimonialTimer: any;
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.serviceOptions = [
      'All Products',
      ...CATEGORIES.map(c => c.name),
      'Other / General Inquiry'
    ];
    this.contactForm.service = this.serviceOptions[0];

    this.subs.push(this.route.queryParams.subscribe(params => {
      if (params['product']) this.prefillFromProduct(params['product']);
      if (params['focus'] === 'name' || params['product']) setTimeout(() => this.scrollToContact(), 300);
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.restOfSlidesReady = true), 1500);
    this.startHeroTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.heroTimer);
    clearInterval(this.testimonialTimer);
    clearTimeout(this.labelTimer);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.subs.forEach(s => s.unsubscribe());
    document.body.style.overflow = '';
  }

  // ================= KEY PRODUCTS (category popups) =================
  readonly keyCategories: ProductCategory[] = CATEGORIES.filter(c => c.featured);
  selectedCategory: ProductCategory | null = null;
  categoryProducts: Product[] = [];

  openCategory(category: ProductCategory): void {
    this.selectedCategory = category;
    this.categoryProducts = productsInCategory(category.id);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedCategory = null;
    document.body.style.overflow = '';
  }

  enquireCategory(category: ProductCategory): void {
    if (this.serviceOptions.includes(category.name)) this.contactForm.service = category.name;
    if (!this.contactForm.message.trim()) {
      this.contactForm.message = `I am interested in your ${category.name} products. Please share details and a quotation.`;
    }
    this.closeModal();
    setTimeout(() => this.scrollToContact(), 50);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedCategory) this.closeModal();
  }
}
