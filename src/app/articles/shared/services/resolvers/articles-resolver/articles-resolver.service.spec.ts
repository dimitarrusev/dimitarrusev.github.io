import { TestBed, inject } from '@angular/core/testing';

import { ArticlesResolver } from './articles-resolver.service';

describe('PostsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesResolver]
    });
  });

  it('should be created', inject([ArticlesResolver], (service: ArticlesResolver) => {
    expect(service).toBeTruthy();
  }));
});
