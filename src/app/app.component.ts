import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
constructor(private title: Title, private meta: Meta, private router: Router) {}
  ngOnInit(): void {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  });

  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    AOS.refresh();
  });

  this.title.setTitle('ProGround Energy | Solar Solutions in India');

  this.meta.updateTag({
    name: 'description',
    content: 'Leading provider of solar panels, inverters and energy storage systems across India.'
  });

  this.meta.updateTag({
    name: 'keywords',
    content: 'Solar Panels India, Solar Inverter, Energy Storage, Industrial UPS, Solar Company'
  });
}
}