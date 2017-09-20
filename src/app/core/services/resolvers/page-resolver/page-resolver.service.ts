import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

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

        data = this.cache.get(slug);
        resolve(data);
      } else {
        this.pageService.getPage(slug)
                        .subscribe(page => {
                          data = {
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
