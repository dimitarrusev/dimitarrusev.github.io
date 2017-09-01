import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppBrowserModule } from './app-browser.module';
import { AppComponent } from './app.component';
import { UniversalInterceptor } from './core';

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
