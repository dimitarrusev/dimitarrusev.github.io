import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolverService } from '../core';
import { PostsResolverService, PostResolverService } from './shared';
import { BlogListComponent } from './blog-list';
import { BlogEntryComponent } from './blog-entry';


const routes = [
  {
    path: 'blog',
    children: [
      {
        path: '',
        component: BlogListComponent,
        data: {
          slug: 'blog'
        },
        resolve: {
          page: PageResolverService,
          posts: PostsResolverService
        }
      },
      {
        path: ':year/:month/:slug',
        component: BlogEntryComponent,
        resolve: {
          post: PostResolverService
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
export class BlogRoutingModule {}
