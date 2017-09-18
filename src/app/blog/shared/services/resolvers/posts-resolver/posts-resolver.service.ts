import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TransferState } from '../../../../../../modules/transfer-state';
import { PostService } from '../../post';

@Injectable()
export class PostsResolverService implements Resolve<any> {
  constructor(
    private cache: TransferState,
    private postService: PostService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      let slug = 'posts';
      let data;

      if (this.cache.get(slug)) {
        data = this.cache.get(slug);
        resolve(data);
      } else {
        this.postService.getPosts();
        this.postService.posts$
                        .subscribe(posts => {
                          data = posts;

                          this.cache.set(slug, data);
                          resolve(data);
                        }, (err) => console.log(err));
      }
    });
  }
}
