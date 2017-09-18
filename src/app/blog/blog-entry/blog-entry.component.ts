import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SeoService } from '../../core';
import { PostService, Post } from '../shared';

@Component({
  selector: 'dr-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent implements OnInit {
  title: string;
  description: string;
  post: Post;
  content: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['post']['title'];
    this.description = this.route.snapshot.data['post']['excerpt'];
    this.post = this.route.snapshot.data['post'];
    this.content = this.route.snapshot.data['post']['content'];

    this.seoService.setTitle(this.title)
                   .setDescription(this.description);
  }
}
