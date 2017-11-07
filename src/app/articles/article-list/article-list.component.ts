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
  slug: string;
  description: string;
  articles: Array<Article>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['page']['title'];
    this.slug = this.activatedRoute.snapshot.data['slug'];
    this.description = this.activatedRoute.snapshot.data['page']['description'];
    this.articles = this.activatedRoute.snapshot.data['articles'];
    this.seoService.setTitle(this.title);
    this.seoService.setDescription(this.description);
  }
}
