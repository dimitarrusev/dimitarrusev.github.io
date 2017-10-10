import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared';
import { ArticleService, ArticleResolver, ArticlesResolver } from './shared';
import { ArticlesRoutingModule } from './articles-routing.module';

import { ArticleListComponent } from './article-list';
import { ArticleDetailComponent } from './article-detail';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  providers: [
    ArticleService,
    ArticleResolver,
    ArticlesResolver
  ]
})
export class ArticlesModule {}
