import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent, PostsListComponent, PostDetailComponent } from './';

const routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: PostsListComponent
      },
      {
        path: ':year/:month/:slug',
        component: PostDetailComponent
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
