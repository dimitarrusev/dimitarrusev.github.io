import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserTransferStateModule } from '../modules/transfer-state';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AboutModule } from './about';
import { ArticlesModule } from './articles';
import { ContactModule } from './contact';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'dimitarrusev.github.io' }),
    BrowserTransferStateModule,
    CoreModule,
    SharedModule,
    AboutModule,
    ArticlesModule,
    ContactModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppBrowserModule {}
