import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SeoService, Post } from '../../core';
import { BlogService } from '../shared';


@Component({
  selector: 'dr-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  postsSubscription: Subscription;
  posts: Array<Post>;

  constructor(
    private seoService: SeoService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.seoService.setTitle('Front-end Engineering Blog')
                   .setDescription('Personal insight and opinions on front-end engineering.');
    this.postsSubscription = this.blogService.posts$.subscribe(posts => this.posts = posts);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
