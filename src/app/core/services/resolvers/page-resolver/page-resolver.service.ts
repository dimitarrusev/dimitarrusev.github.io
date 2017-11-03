import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { concat, skip, take, takeWhile } from 'rxjs/operators';

import { TransferState } from '../../../../../modules/transfer-state';
import { ProgressBarService } from '../../../../shared';
import { PageService } from '../../data';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private progressBarService: ProgressBarService,
    private pageService: PageService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      const urlSlug = route.data.slug;
      const cacheSlug = `page-${route.data.slug}`;

      if (this.cache.get(cacheSlug)) {
        resolve(this.cache.get(cacheSlug));
      } else {
        this.pageService.getPage(urlSlug);

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

          this.cache.set(cacheSlug, data);
          resolve(data);
        }, (err) => console.log(err));
      }
    });
  }
}
