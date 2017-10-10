import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent, ProgressBarService, RemarkboxComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent,
    RemarkboxComponent
  ],
  declarations: [
    ProgressBarComponent,
    RemarkboxComponent
  ],
  providers: [
    ProgressBarService
  ]
})
export class SharedModule {}
