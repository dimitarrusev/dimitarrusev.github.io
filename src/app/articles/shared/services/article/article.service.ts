import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Article } from '../../models';

@Injectable()
export class ArticleService {
  private articles = new ReplaySubject<Array<Article>>(1);
  public readonly articles$: Observable<Array<Article>> = this.articles.asObservable();

  constructor(private httpClient: HttpClient) {}

  getArticles() {
    return this.httpClient.get<Array<Article>>(`${environment.articlesUrlBase}/articles.json`)
                          .subscribe(result => this.articles.next(result));
  }

  getArticle(title): Observable<Article> {
    return this.httpClient.get(`${environment.articlesUrlBase}/${title}.json`);
  }
}
