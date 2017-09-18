import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolverService } from '../core';
import { AboutComponent } from './about.component';

const routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      slug: 'about'
    },
    resolve: {
      page: PageResolverService
    }
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
export class AboutRoutingModule {}
