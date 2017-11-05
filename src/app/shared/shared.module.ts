import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarModule } from './modules';
import { NewsletterComponent, CommentsComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  exports: [
    ProgressBarModule,
    CommentsComponent,
    NewsletterComponent
  ],
  declarations: [
    CommentsComponent,
    NewsletterComponent
  ]
})
export class SharedModule {}
