import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransferState } from '../../../../../../modules/transfer-state';
import { ArticleService } from '../../article';

@Injectable()
export class ArticlesResolver implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private articleservice: ArticleService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = 'posts';
      let data;

      if (this.cache.get(slug)) {
        data = this.cache.get(slug);
        resolve(data);
      } else {
        this.articleservice.getArticles();
        this.articleservice.articles$
                           .subscribe(articles => {
                              data = articles;

                              this.cache.set(slug, data);
                              resolve(data);
                           }, (err) => console.log(err));
      }
    });
  }
}
