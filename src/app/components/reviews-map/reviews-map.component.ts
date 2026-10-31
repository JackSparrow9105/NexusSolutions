import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAP_VIEWBOX, SOUTH_STATES, CITY_POINTS } from '../../shared/south-india-map';

export interface Review {
  name: string;
  location: string;
  message: string;
}

interface Pin {
  review: Review;
  city: string;
  x: number;
  y: number;
}

// Spelling variants people type for the same place
const CITY_ALIASES: { [k: string]: string } = {
  hydrabad: 'Hyderabad', hyderabad: 'Hyderabad',
  kerla: 'Kerala', kerala: 'Kerala', kochi: 'Kerala', cochin: 'Kerala',
  trichy: 'Trichy', tiruchirappalli: 'Trichy', tiruchi: 'Trichy',
  bangalore: 'Bengaluru', bengaluru: 'Bengaluru',
  chennai: 'Chennai', madras: 'Chennai',
  coimbatore: 'Coimbatore', kovai: 'Coimbatore',
  salem: 'Salem', vijayawada: 'Vijayawada'
};

@Component({
  selector: 'app-reviews-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-map.component.html',
  styleUrls: ['./reviews-map.component.scss']
})
export class ReviewsMapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() reviews: Review[] = [];

  readonly viewBox = MAP_VIEWBOX;
  readonly states = SOUTH_STATES;
  pins: Pin[] = [];
  active = 0;
  private timer: any;

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnChanges(): void {
    this.pins = this.reviews
      .map(review => {
        const city = CITY_ALIASES[review.location.trim().toLowerCase()] ?? review.location.trim();
        const pt = CITY_POINTS[city];
        return pt ? { review, city, x: pt[0], y: pt[1] } : null;
      })
      .filter((p): p is Pin => !!p);
    this.active = 0;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get current(): Pin | undefined {
    return this.pins[this.active];
  }

  select(i: number): void {
    this.active = i;
    this.startAuto(); // restart the countdown so the chosen review stays a while
  }

  next(step = 1): void {
    if (!this.pins.length) return;
    this.select((this.active + step + this.pins.length) % this.pins.length);
  }

  private startAuto(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.pins.length) this.active = (this.active + 1) % this.pins.length;
    }, 6000);
  }

  /** which side of the pin each city name goes, so labels never overlap */
  labelLeft(p: Pin): boolean {
    return ['Bengaluru', 'Vijayawada', 'Coimbatore'].includes(p.city);
  }
}
