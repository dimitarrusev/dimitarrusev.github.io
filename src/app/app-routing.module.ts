import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './core';

const routes = [
  { path: '', loadChildren: 'app/articles/articles.module#ArticlesModule' },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'articles', loadChildren: 'app/articles/articles.module#ArticlesModule' },
  { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
