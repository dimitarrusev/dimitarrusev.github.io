import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'dimitarrusev.github.io' }),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
