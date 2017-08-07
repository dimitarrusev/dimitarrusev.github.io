import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'dimitarrusev.github.io' }),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BlogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
