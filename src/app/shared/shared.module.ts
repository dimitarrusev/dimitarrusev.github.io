import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent, ProgressBarService, NewsletterComponent, CommentsComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent,
    CommentsComponent,
    NewsletterComponent
  ],
  declarations: [
    ProgressBarComponent,
    CommentsComponent,
    NewsletterComponent
  ],
  providers: [
    ProgressBarService
  ]
})
export class SharedModule {}
