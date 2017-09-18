import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransferState } from '../../../../../../modules/transfer-state';
import { PostService } from '../../post';

@Injectable()
export class PostResolverService implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private postService: PostService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = `${ route.params['year'] }-${ route.params['month'] }-${ route.params['slug'] }`;
      let data;

      if (this.cache.get(slug)) {
        data = this.cache.get(slug);
        resolve(data);
      } else {
        this.postService.getPost(route.params['year'], route.params['month'], route.params['slug'])
                        .subscribe(post => {
                          data = post;

                          this.cache.set(slug, data);
                          resolve(data);
                        }, (err) => console.log(err));
      }
    });
  }
}
