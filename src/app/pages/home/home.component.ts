import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PRODUCTS, ProductSpec } from '../../shared/product-data';

interface FeaturedProduct {
  title: string;
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

  serviceOptions: string[] = [];
  toastMessage: string = '';
  showToast: boolean = false;
  private toastTimeout: any;

  constructor(private route: ActivatedRoute) {}

  // ================= VALIDATION =================
  private showToastMessage(msg: string): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastMessage = msg;
    this.showToast = true;
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.toastTimeout = null;
    }, 3500);
  }

  private validateForm(): boolean {
    // 1. Name: required, max 100 chars
    const name = this.contactForm.name.trim();
    if (!name) {
      this.showToastMessage('Please enter your full name.');
      return false;
    }
    if (name.length > 100) {
      this.showToastMessage('Name must be under 100 characters.');
      return false;
    }

    // 2. Mobile: required, exactly 10 digits, numeric only
    const mobile = this.contactForm.mobile.trim();
    if (!mobile) {
      this.showToastMessage('Please enter your mobile number.');
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      this.showToastMessage('Mobile number must be exactly 10 digits (numbers only).');
      return false;
    }

    // 3. Email: optional, but if provided max 50 chars
    const email = this.contactForm.email.trim();
    if (email && email.length > 50) {
      this.showToastMessage('Email address must be under 50 characters.');
      return false;
    }

    // 4. Message: optional, but if provided max 500 chars
    const message = this.contactForm.message.trim();
    if (message && message.length > 500) {
      this.showToastMessage('Message must be under 500 characters.');
      return false;
    }

    return true;
  }

  // ================= WHATSAPP =================
  sendToWhatsApp() {
    if (!this.validateForm()) return;

    const messageText = `Hello Nexus Solutions,\n\nI would like to make an inquiry:\n\n*Name:* ${this.contactForm.name}\n*Mobile:* ${this.contactForm.mobile}\n*Email:* ${this.contactForm.email}\n*Service:* ${this.contactForm.service}\n*Message:* ${this.contactForm.message}`;
    const encodedText = encodeURIComponent(messageText);
    const phoneNumber = '918905302210';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

  // ================= EMAIL (Send Directly) =================
  sendEmail() {
    if (!this.validateForm()) return;

    const subject = encodeURIComponent(`Inquiry from ${this.contactForm.name}`);
    const body = encodeURIComponent(
      `Name: ${this.contactForm.name}\n` +
      `Mobile: ${this.contactForm.mobile}\n` +
      `Email: ${this.contactForm.email}\n` +
      `Service: ${this.contactForm.service}\n\n` +
      `Message:\n${this.contactForm.message}`
    );
    const mailtoLink = `mailto:sales@mynexussolutions.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  }

  closeToast(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
    this.showToast = false;
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

  // ================= COUNTERS =================
  years = 0;
  customers = 0;
  projects = 0;

  startCounter(): void {
    const interval = setInterval(() => {
      if (this.years < 5) this.years++;
      if (this.customers < 500) this.customers += 100;
      if (this.projects < 20) this.projects += 5;
      if (this.years >= 5 && this.customers >= 500 && this.projects >= 20) {
        clearInterval(interval);
      }
    }, 30);
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
  ngOnInit(): void {
    this.startCounter();

    const categories = new Set(PRODUCTS.map(p => p.category));
    this.serviceOptions = [
      'All Products',
      ...Array.from(categories).sort(),
      'Other / General Inquiry'
    ];
    if (this.serviceOptions.length) {
      this.contactForm.service = this.serviceOptions[0];
    }

    this.route.fragment.subscribe(fragment => {
      if (fragment === 'contact') this.focusContactForm();
    });
    this.route.queryParams.subscribe(params => {
      if (params['focus'] === 'name') this.focusContactForm();
    });
  }

  ngAfterViewInit(): void {
    this.startHeroTimer();
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.heroTimer);
    clearTimeout(this.labelTimer);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  private focusContactForm(): void {
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.nativeElement.focus();
        this.nameInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }

  // ================= PRODUCT MODAL =================
  selectedProduct: FeaturedProduct | null = null;

  productDetails: { [key: string]: FeaturedProduct } = {
    earthing: {
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
    document.body.style.overflow = 'auto';
  }
}