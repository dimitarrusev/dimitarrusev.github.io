import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../core';
import { BlogService } from '../shared';

@Component({
  selector: 'dr-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  paramsSubscription: Subscription;
  postSubscription: Subscription;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.postSubscription = this.blogService.getPost(params.year, params.month, params.slug)
                                              .subscribe(post => this.post = post);
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
