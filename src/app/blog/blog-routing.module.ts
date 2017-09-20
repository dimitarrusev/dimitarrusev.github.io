import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolver } from '../core';
import { PostsResolver, PostResolver } from './shared';
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
          page: PageResolver,
          posts: PostsResolver
        }
      },
      {
        path: ':year/:month/:slug',
        component: BlogEntryComponent,
        resolve: {
          post: PostResolver
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
