import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <--- IMPORT ADDED HERE

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
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
  imports: [CommonModule, RouterModule, FormsModule], // <--- ADDED FormsModule HERE
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  // ================= CONTACT FORM TO WHATSAPP =================
  contactForm = {
    name: '',
    email: '',
    service: 'Earthing Systems', // Default selection
    message: ''
  };

  sendToWhatsApp() {
    // Check if essential fields are filled (basic validation)
    if (!this.contactForm.name || !this.contactForm.message) {
      alert("Please fill in your name and message.");
      return;
    }

    // 1. Format the message exactly how it will appear in WhatsApp
    const messageText = `Hello Nexus Solutions,\n\nI would like to make an inquiry:\n\n*Name:* ${this.contactForm.name}\n*Email:* ${this.contactForm.email}\n*Service:* ${this.contactForm.service}\n*Message:* ${this.contactForm.message}`;

    // 2. Encode the text so it works safely in a URL
    const encodedText = encodeURIComponent(messageText);

    // 3. Your target WhatsApp Number
    const phoneNumber = '919161495113';

    // 4. Construct the final URL and open it
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

  // ================= HERO SLIDER =================
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

  ngOnInit(): void {
    this.startCounter();
  }

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

  ngAfterViewInit(): void {
    this.startHeroTimer();

    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.heroTimer);
    clearTimeout(this.labelTimer);
  }

  // ================= PRODUCTS =================
  selectedProduct: Product | null = null;

  productDetails: { [key: string]: Product } = {
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