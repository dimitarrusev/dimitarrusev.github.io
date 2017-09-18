import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SeoService } from '../../core';
import { Post } from '../shared';

@Component({
  selector: 'dr-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  title: string;
  description: string;
  posts: Array<Post>;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['page']['title'];
    this.description = this.route.snapshot.data['page']['description'];
    this.posts = this.route.snapshot.data['posts'];

    this.seoService.setTitle(this.title)
                   .setDescription(this.description);
  }
}
