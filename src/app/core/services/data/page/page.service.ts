import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Page } from '../../../../shared';

@Injectable()
export class PageService {
  private page: BehaviorSubject<Page> = new BehaviorSubject(null);
  private pageDownloadProgress: BehaviorSubject<Number> = new BehaviorSubject(null);

  public readonly page$: Observable<Page> = this.page.asObservable();
  public readonly pageDownloadProgress$: Observable<Number> = this.pageDownloadProgress.asObservable();

  constructor(private httpClient: HttpClient) {}

  getPage(slug) {
    const request = new HttpRequest('GET', `${environment.pagesUrlBase}/${slug}.json`, { reportProgress: true });

    this.httpClient.request<Page>(request)
                   .subscribe(event => {
                      switch (event.type) {
                        case HttpEventType.DownloadProgress:
                          this.pageDownloadProgress.next(Math.round((event.loaded / event.total) * 100));
                          break;
                        case HttpEventType.Response:
                          this.page.next(event.body);
                          break;
                      }
                   });
  }
}
