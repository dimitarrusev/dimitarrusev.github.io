import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../core';
import { BlogService } from '../shared';


@Component({
  selector: 'dr-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  postsSubscription: Subscription;
  posts: Array<Post>;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.postsSubscription = this.blogService.posts$.subscribe(posts => {
      this.posts = posts;

      this.posts.forEach(post => {
        let date = post.date.split('-');
        post.year = date[0];
        post.month = date[1];
        post.day = date[2];
      });
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
