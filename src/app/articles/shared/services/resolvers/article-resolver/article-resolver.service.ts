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
export class ArticleResolver implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private articleService: ArticleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = route.params['slug'];

      if (this.cache.get(slug)) {
        resolve(this.cache.get(slug));
      } else {
        this.articleService.getArticle(slug);

        this.articleService.articleDownloadProgress$
                           .skip(1)
                           .takeWhile((percentDone: number) => percentDone < 100)
                           .concat(this.articleService.articleDownloadProgress$.take(1))
                           .subscribe((percentDone: number) => {
                             console.log(`loading article: ${percentDone}%`);
                           }, (err) => console.log(err));

        this.articleService.article$
                           .skip(1)
                           .take(1)
                           .subscribe(article => {
                              this.cache.set(slug, article);
                              resolve(article);
                           }, (err) => console.log(err));
      }
    });
  }
}
