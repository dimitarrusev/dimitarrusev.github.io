import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolver } from '../core';
import { ArticlesResolver, ArticleResolver } from './shared';
import { ArticleListComponent } from './article-list';
import { ArticleDetailComponent } from './article-detail';


const routes = [
  {
    path: 'articles',
    children: [
      {
        path: '',
        component: ArticleListComponent,
        data: {
          slug: 'articles'
        },
        resolve: {
          page: PageResolver,
          articles: ArticlesResolver
        }
      },
      {
        path: ':slug',
        component: ArticleDetailComponent,
        resolve: {
          article: ArticleResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule {}
