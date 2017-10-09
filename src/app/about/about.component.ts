import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

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
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['page']['title'];
    this.description = this.route.snapshot.data['page']['description'];
    this.content = this.route.snapshot.data['page']['content'];

    this.seoService.setTitle(this.title)
                   .setDescription(this.description);
  }
}
