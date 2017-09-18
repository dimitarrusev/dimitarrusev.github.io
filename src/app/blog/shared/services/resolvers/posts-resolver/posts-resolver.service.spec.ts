import { TestBed, inject } from '@angular/core/testing';

import { PostsResolverService } from './posts-resolver.service';

describe('PostsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsResolverService]
    });
  });

  it('should be created', inject([PostsResolverService], (service: PostsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
