import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'dimitarrusev.github.io' }),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BlogComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
