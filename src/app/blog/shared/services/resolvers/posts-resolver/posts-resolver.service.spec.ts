import { TestBed, inject } from '@angular/core/testing';

import { PostsResolver } from './posts-resolver.service';

describe('PostsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsResolver]
    });
  });

  it('should be created', inject([PostsResolver], (service: PostsResolver) => {
    expect(service).toBeTruthy();
  }));
});
