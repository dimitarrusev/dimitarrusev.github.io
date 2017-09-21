import { TestBed, inject } from '@angular/core/testing';

import { ArticleResolver } from './article-resolver.service';

describe('ArticleResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleResolver]
    });
  });

  it('should be created', inject([ArticleResolver], (service: ArticleResolver) => {
    expect(service).toBeTruthy();
  }));
});
