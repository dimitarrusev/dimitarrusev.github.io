import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

import { TransferState } from '../../../../../../modules/transfer-state';
import { ArticleService } from '../../article';

@Injectable()
export class ArticlesResolver implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private articleService: ArticleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = route.data.slug;

      if (this.cache.get(slug)) {
        resolve(this.cache.get(slug));
      } else {
        this.articleService.articlesDownloadProgress$
                           .skip(1)
                           .takeWhile((percentDone: number) => percentDone < 100)
                           .concat(this.articleService.articlesDownloadProgress$.take(1))
                           .subscribe((percentDone: number) => {
                             // console.log(`loading articles: ${percentDone}%`);
                           }, (err) => console.log(err));

        this.articleService.articles$
                           .skip(1)
                           .take(1)
                           .subscribe(articles => {
                              this.cache.set(slug, articles);
                              resolve(articles);
                           }, (err) => console.log(err));
      }
    });
  }
}
