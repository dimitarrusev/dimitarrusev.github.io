import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { concat, skip, take, takeWhile } from 'rxjs/operators';

import { ProgressBarService } from '../../../../shared';
import { Page } from '../../../../shared';
import { PageService } from '../../data';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(
    private store: TransferState,
    private progressBarService: ProgressBarService,
    private pageService: PageService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const slug = route.data.slug;
      const key = makeStateKey<Page>(`page-${ slug }`);

      if (this.store.hasKey(key)) {
        resolve(this.store.get(key, undefined));
      } else {
        this.pageService.getPage(slug);

        if (isPlatformBrowser(this.platformId)) {
          this.progressBarService.showProgressBar();
          this.pageService.pageDownloadProgress$.pipe(
            skip(1),
            takeWhile((percentDone: number) => percentDone < 100),
            concat(this.pageService.pageDownloadProgress$.pipe(take(1)))
          ).subscribe((percentDone: number) => {
            (percentDone < 100)
              ? this.progressBarService.updateProgress(percentDone)
              : this.progressBarService.hideProgressBar();
          }, (err) => console.log(err));
        }

        this.pageService.page$.pipe(
          skip(1),
          take(1)
        ).subscribe(page => {
          const data = {
            title: page.title,
            description: page.description,
            content: page.content
          };

          this.store.set(key, data);
          resolve(data);
        }, (err) => console.log(err));
      }
    });
  }
}
