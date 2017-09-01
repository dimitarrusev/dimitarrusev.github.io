import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BlogRoutingModule } from './blog-routing.module';
import {
  BlogComponent,
  BlogService,
  PostsListComponent,
  PostDetailComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogComponent,
    PostsListComponent,
    PostDetailComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {}
