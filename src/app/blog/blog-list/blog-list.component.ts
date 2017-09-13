import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService, Post } from '../../core';

@Component({
  selector: 'dr-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  postsSubscription: Subscription;
  posts: Array<Post>;

  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postsSubscription = this.postService.posts$.subscribe(posts => this.posts = posts);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
