import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AiAssistantComponent } from './shared/ai-assistant/ai-assistant.component';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AiAssistantComponent],
  templateUrl: './app.component.html',
styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
constructor(private title: Title, private meta: Meta, private router: Router, private scroller: ViewportScroller) {
  // #fragment links (Contact, About, product items) stop just below the fixed navbar instead of under it
  this.scroller.setOffset(() => [0, (document.querySelector('.navbar')?.getBoundingClientRect().height ?? 80) + 10]);
}
  ngOnInit(): void {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  });

  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    AOS.refresh();
  });

  this.title.setTitle('Nexus Solutions | Earthing, Lightning Protection & Solar BOS');

  this.meta.updateTag({
    name: 'description',
    content: 'Nexus Solutions, Chennai: chemical earthing, ESE lightning arresters, solar BOS kits and DC cables for industrial and solar projects across India.'
  });

  this.meta.updateTag({
    name: 'keywords',
    content: 'chemical earthing, earthing electrode, lightning arrester, ESE lightning arrester, solar BOS, DC cable, earthing Chennai'
  });
}
}