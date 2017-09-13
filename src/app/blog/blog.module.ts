import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list';
import { BlogEntryComponent } from './blog-entry';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogEntryComponent
  ]
})
export class BlogModule {}
