import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { SeoService } from '../core';

@Component({
  selector: 'dr-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title: string;
  description: string;
  content: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['page']['title'];
    this.description = this.route.snapshot.data['page']['description'];
    this.content = this.route.snapshot.data['page']['content'];

    this.seoService.setTitle(this.title)
                   .setDescription(this.description);
  }
}
