import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SeoService, PostService, Post } from '../../core';

@Component({
  selector: 'dr-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent implements OnInit {
  paramsSubscription: Subscription;
  postSubscription: Subscription;
  post: Post;
  content: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.postSubscription = this.postService.getPost(params.year, params.month, params.slug)
      .subscribe(post => {
        this.post = post;
        this.content = post.content;
        this.seoService.setTitle(post.title)
                       .setDescription(post.excerpt);
      });
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
