import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SeoService, PageService, Page } from '../core';

@Component({
  selector: 'dr-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  pageSubscription: Subscription;
  content: SafeHtml;

  constructor(
    private seoService: SeoService,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.pageSubscription = this.pageService.getPage('contact').subscribe(page => {
      this.seoService.setTitle(page.title)
                     .setDescription(page.description);

      this.content = page.content;
    });
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
