import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Post } from '../../../core';

@Injectable()
export class BlogService {
  private posts = new ReplaySubject<Array<Post>>(1);
  public readonly posts$: Observable<Array<Post>> = this.posts.asObservable();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<Array<Post>>('content/posts/posts.json')
                          .subscribe(result => this.posts.next(result));
  }

  getPost(year, month, title): Observable<Post> {
    return this.httpClient.get(`content/posts/${year}-${month}-${title}.json`);
  }
}
