import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SeoService } from './core';

@Component({
  selector: 'dr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routerEventsSubscription: Subscription;

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        // don't display brand name on the home page
        (routerEvent.url === '/')
          ? this.seoService.settings = { displayBrandName: false }
          : this.seoService.settings = { displayBrandName: true };
      };
    });
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }
}
