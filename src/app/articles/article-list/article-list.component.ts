import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeoService } from '../../core';
import { Article } from '../shared';

@Component({
  selector: 'dr-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  title: string;
  invertTitleOrder: boolean;
  slug: string;
  description: string;
  articles: Array<Article>;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['page']['title'];
    this.slug = this.route.snapshot.data['slug'];
    this.description = this.route.snapshot.data['page']['description'];
    this.articles = this.route.snapshot.data['articles'];

    // invert page title and brand name order only on the home page
    // example: `brand name | page title` instead of `page title | brand name`
    (this.slug === 'home')
      ? this.invertTitleOrder = true
      : this.invertTitleOrder = false;

    this.seoService.setTitle(this.title, this.invertTitleOrder)
                   .setDescription(this.description);
  }
}
