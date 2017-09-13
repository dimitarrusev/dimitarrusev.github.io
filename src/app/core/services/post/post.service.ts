import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Page, Post } from '../../models';

@Injectable()
export class PostService {
  private posts = new ReplaySubject<Array<Post>>(1);
  public readonly posts$: Observable<Array<Post>> = this.posts.asObservable();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<Array<Post>>(`${environment.postsUrlBase}/posts.json`)
                          .subscribe(result => this.posts.next(result));
  }

  getPost(year, month, title): Observable<Post> {
    return this.httpClient.get(`${environment.postsUrlBase}/${year}-${month}-${title}.json`);
  }
}
