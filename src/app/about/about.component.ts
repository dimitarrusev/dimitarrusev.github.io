import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { SeoService } from '../core';

@Component({
  selector: 'dr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title: string;
  description: string;
  content: SafeHtml;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['page']['title'];
    this.description = this.activatedRoute.snapshot.data['page']['description'];
    this.content = this.activatedRoute.snapshot.data['page']['content'];
    this.seoService.setTitle(this.title);
    this.seoService.setDescription(this.description);
  }
}
