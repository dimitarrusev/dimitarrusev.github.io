import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolver } from '../core';
import { ArticlesResolver, ArticleResolver } from './shared';
import { ArticleListComponent } from './article-list';
import { ArticleDetailComponent } from './article-detail';


const routes = [
  {
    path: '',
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
        path: 'articles/:slug',
        pathMatch: 'full',
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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule {}
