import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent, ProgressBarService, RemarkboxComponent } from './components';
import { MailingListComponent } from './components/mailing-list';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent,
    RemarkboxComponent,
    MailingListComponent
  ],
  declarations: [
    ProgressBarComponent,
    RemarkboxComponent,
    MailingListComponent
  ],
  providers: [
    ProgressBarService
  ]
})
export class SharedModule {}
