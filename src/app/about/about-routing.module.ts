import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolver } from '../core';
import { AboutComponent } from './about.component';

const routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      slug: 'about'
    },
    resolve: {
      page: PageResolver
    }
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
export class AboutRoutingModule {}
