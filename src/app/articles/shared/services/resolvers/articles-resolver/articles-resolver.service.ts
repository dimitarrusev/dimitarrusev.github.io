import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { concat, skip, take, takeWhile } from 'rxjs/operators';

import { ArticleService } from '../../article';
import { Article } from '../../../models';

@Injectable()
export class ArticlesResolver implements Resolve<any> {
  constructor(
    private store: TransferState,
    private articleService: ArticleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const slug = route.data.slug;
      const key = makeStateKey<Array<Article>>(slug);

      if (this.store.hasKey(key)) {
        resolve(this.store.get(key, undefined));
      } else {
        this.articleService.getArticles();
        this.articleService.articlesDownloadProgress$.pipe(
          skip(1),
          takeWhile((percentDone: number) => percentDone < 100),
          concat(this.articleService.articlesDownloadProgress$.pipe(take(1)))
        ).subscribe((percentDone: number) => {
         // console.log(`loading articles: ${percentDone}%`);
        }, (err) => console.log(err));

        this.articleService.articles$.pipe(
          skip(1),
          take(1)
        ).subscribe(articles => {
          this.store.set(key, articles);
          resolve(articles);
        }, (err) => console.log(err));
      }
    });
  }
}
