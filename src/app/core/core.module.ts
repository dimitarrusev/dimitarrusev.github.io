import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotFoundComponent } from './components';
import { throwIfAlreadyLoaded } from './guards';
import { SeoService, PageService, PageResolver } from './services';
import { UniversalInterceptor } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
    SeoService,
    PageService,
    PageResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
