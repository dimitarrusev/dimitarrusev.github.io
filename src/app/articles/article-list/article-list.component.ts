import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SeoService } from '../../core';
import { Article } from '../shared';

@Component({
  selector: 'dr-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  title: string;
  description: string;
  articles: Array<Article>;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['page']['title'];
    this.description = this.route.snapshot.data['page']['description'];
    this.articles = this.route.snapshot.data['articles'];

    this.seoService.setTitle(this.title)
                   .setDescription(this.description);
  }
}
