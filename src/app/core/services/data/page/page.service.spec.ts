import { TestBed, inject } from '@angular/core/testing';

import { PageService } from './page.service';

describe('PagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageService]
    });
  });

  it('should be created', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
