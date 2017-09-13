import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SeoService, PageService, Page } from '../core';

@Component({
  selector: 'dr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  pageSubscription: Subscription;
  content: SafeHtml;

  constructor(
    private seoService: SeoService,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.pageSubscription = this.pageService.getPage('about').subscribe(page => {
      this.seoService.setTitle(page.title)
                     .setDescription(page.description);

      this.content = page.content;
    });
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
