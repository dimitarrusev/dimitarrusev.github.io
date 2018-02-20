import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { filter, first } from 'rxjs/operators';

import { AppBrowserModule } from './app-browser.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
