import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

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
