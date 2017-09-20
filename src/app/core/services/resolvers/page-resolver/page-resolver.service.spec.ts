import { TestBed, inject } from '@angular/core/testing';

import { PageResolver } from './page-resolver.service';

describe('PageResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageResolver]
    });
  });

  it('should be created', inject([PageResolver], (service: PageResolver) => {
    expect(service).toBeTruthy();
  }));
});
