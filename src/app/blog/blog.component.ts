import { Component, OnInit } from '@angular/core';
import { BlogService } from './shared';

@Component({
  selector: 'dr-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts();
  }
}
