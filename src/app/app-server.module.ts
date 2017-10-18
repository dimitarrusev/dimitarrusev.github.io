import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerPrebootModule } from 'preboot/server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { ServerTransferStateModule, TransferState } from '../modules/transfer-state';
import { AppBrowserModule } from './app-browser.module';
import { AppComponent } from './app.component';

export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
          .filter(stable => stable)
          .first()
          .subscribe(() => {
            transferState.inject();
          });
  };
}

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'dr-root' }),
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
