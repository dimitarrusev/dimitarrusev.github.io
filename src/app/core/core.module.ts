import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SeoService, PageService, PostService } from './services';
import { UniversalInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SeoService,
    PageService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
