import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

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
      let urlSlug = route.data.slug;
      let cacheSlug = `page-${route.data.slug}`;

      if (this.cache.get(cacheSlug)) {
        resolve(this.cache.get(cacheSlug));
      } else {
        this.pageService.getPage(urlSlug);

        if (isPlatformBrowser(this.platformId)) {
          this.progressBarService.showProgressBar();
          this.pageService.pageDownloadProgress$
                          .skip(1)
                          .takeWhile((percentDone: number) => percentDone < 100)
                          .concat(this.pageService.pageDownloadProgress$.take(1))
                          .subscribe((percentDone: number) => {
                            (percentDone < 100)
                              ? this.progressBarService.updateProgress(percentDone)
                              : this.progressBarService.hideProgressBar();
                          }, (err) => console.log(err));
        }

        this.pageService.page$
                        .skip(1)
                        .take(1)
                        .subscribe(page => {
                          let data = {
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
