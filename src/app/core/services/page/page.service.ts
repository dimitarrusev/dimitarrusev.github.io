import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../models';

@Injectable()
export class PageService {
  constructor(private httpClient: HttpClient) {}

  getPage(page): Observable<Page> {
    return this.httpClient.get(`${environment.pagesUrlBase}/${page}.json`);
  }
}
