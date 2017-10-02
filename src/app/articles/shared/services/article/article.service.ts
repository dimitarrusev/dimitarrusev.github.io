import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/take';

import { environment } from '../../../../../environments/environment';
import { Article } from '../../models';

@Injectable()
export class ArticleService {
  private articles: BehaviorSubject<Array<Article>> = new BehaviorSubject(null);
  private articlesDownloadProgress: BehaviorSubject<Number> = new BehaviorSubject(null);

  public readonly articles$: Observable<Array<Article>> = this.articles.asObservable();
  public readonly articlesDownloadProgress$: Observable<Number> = this.articlesDownloadProgress.asObservable();

  private article: BehaviorSubject<Article> = new BehaviorSubject(null);
  private articleDownloadProgress: BehaviorSubject<Number> = new BehaviorSubject(null);

  public readonly article$: Observable<Article> = this.article.asObservable();
  public readonly articleDownloadProgress$: Observable<Number> = this.articleDownloadProgress.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getArticles();
  }

  getArticles() {
    const request = new HttpRequest('GET', `${environment.articlesUrlBase}/articles.json`, { reportProgress: true });

    this.httpClient.request<Array<Article>>(request)
                   .subscribe(event => {
                      switch (event.type) {
                        case HttpEventType.DownloadProgress:
                          this.articlesDownloadProgress.next(Math.round((event.loaded / event.total) * 100));
                          break;
                        case HttpEventType.Response:
                          this.articles.next(event.body);
                          break;
                      }
                   });
  }

  getArticle(slug: string) {
    const request = new HttpRequest('GET', `${environment.articlesUrlBase}/${slug}.json`, { reportProgress: true });

    this.httpClient.request<Article>(request)
                   .subscribe(event => {
                      switch (event.type) {
                        case HttpEventType.DownloadProgress:
                          this.articleDownloadProgress.next(Math.round((event.loaded / event.total) * 100));
                          break;
                        case HttpEventType.Response:
                          this.article.next(event.body);
                          break;
                      }
                   });
  }
}
