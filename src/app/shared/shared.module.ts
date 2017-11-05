import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent, ProgressBarService, NewsletterComponent, RemarkboxComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent,
    RemarkboxComponent,
    NewsletterComponent
  ],
  declarations: [
    ProgressBarComponent,
    RemarkboxComponent,
    NewsletterComponent
  ],
  providers: [
    ProgressBarService
  ]
})
export class SharedModule {}
