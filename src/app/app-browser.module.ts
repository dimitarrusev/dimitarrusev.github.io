import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core';
import { BlogModule } from './blog/blog.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { NotFoundComponent } from './not-found';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'dimitarrusev.github.io' }),
    CoreModule,
    BlogModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
