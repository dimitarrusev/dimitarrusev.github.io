import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

import { TransferState } from '../../../../../modules/transfer-state';
import { PageService } from '../../data';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private pageService: PageService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = route.data.slug;
      let data;

      if (this.cache.get(slug)) {
        resolve(this.cache.get(slug));
      } else {
        this.pageService.getPage(slug);

        this.pageService.pageDownloadProgress$
                        .skip(1)
                        .takeWhile((percentDone: number) => percentDone < 100)
                        .concat(this.pageService.pageDownloadProgress$.take(1))
                        .subscribe((percentDone: number) => {
                          console.log(`loading page: ${percentDone}%`);
                        }, (err) => console.log(err));

        this.pageService.page$
                        .skip(1)
                        .take(1)
                        .subscribe(page => {
                          let data = {
                            title: page.title,
                            description: page.description,
                            content: page.content
                          };

                          this.cache.set(slug, data);
                          resolve(data);
                        }, (err) => console.log(err));
      }
    });
  }
}
