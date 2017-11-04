import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { concat, skip, take, takeWhile } from 'rxjs/operators';

// import { TransferState } from '../../../../../../modules/transfer-state';
import { ProgressBarService } from '../../../../../shared';
import { ArticleService } from '../../article';
import { Article } from '../../../models';

@Injectable()
export class ArticleResolver implements Resolve<any> {
  constructor(
    private store: TransferState,
    private progressBarService: ProgressBarService,
    private articleService: ArticleService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const slug = route.params.slug;
      const key = makeStateKey<Article>(`article-${ slug }`);

      if (this.store.hasKey(key)) {
        resolve(this.store.get(key, undefined));
      } else {
        this.articleService.getArticle(slug);

        if (isPlatformBrowser(this.platformId)) {
          this.progressBarService.showProgressBar();

          this.articleService.articleDownloadProgress$.pipe(
            skip(1),
            takeWhile((percentDone: number) => percentDone < 100),
            concat(this.articleService.articleDownloadProgress$.pipe(take(1))),
          ).subscribe((percentDone: number) => {
            (percentDone < 100)
              ? this.progressBarService.updateProgress(percentDone)
              : this.progressBarService.hideProgressBar();
          }, (err) => console.log(err));
        }

        this.articleService.article$.pipe(
          skip(1),
          take(1)
        ).subscribe(article => {
          this.store.set(key, article);
          resolve(article);
        }, (err) => console.log(err));
      }
    });
  }
}
