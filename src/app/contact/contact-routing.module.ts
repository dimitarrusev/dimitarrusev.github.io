import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageResolverService } from '../core';
import { ContactComponent } from './contact.component';

const routes = [
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      slug: 'contact'
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
export class ContactRoutingModule {}
