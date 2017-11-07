import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

import { SeoService } from '../../core';
import { ArticleService, Article } from '../shared';

@Component({
  selector: 'dr-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  title: string;
  description: string;
  article: Article;
  content: SafeHtml;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['article']['title'];
    this.description = this.activatedRoute.snapshot.data['article']['excerpt'];
    this.article = this.activatedRoute.snapshot.data['article'];
    this.content = this.activatedRoute.snapshot.data['article']['content'];
    this.seoService.setTitle(this.title);
    this.seoService.setDescription(this.description);
  }
}
