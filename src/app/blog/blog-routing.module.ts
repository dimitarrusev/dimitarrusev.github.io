import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list';
import { BlogEntryComponent } from './blog-entry';


const routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: BlogListComponent
      },
      {
        path: ':year/:month/:slug',
        component: BlogEntryComponent
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
