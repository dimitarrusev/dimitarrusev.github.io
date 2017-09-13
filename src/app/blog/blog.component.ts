import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SeoService, PageService, PostService, Page } from '../core';

@Component({
  selector: 'dr-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  pageSubscription: Subscription;

  constructor(
    private seoService: SeoService,
    private pageService: PageService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.pageSubscription = this.pageService.getPage('blog')
                                            .subscribe(page => this.seoService.setTitle(page.title).setDescription(page.description));

    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }
}
