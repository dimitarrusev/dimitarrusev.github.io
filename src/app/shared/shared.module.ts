import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent, ProgressBarService } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent
  ],
  declarations: [
    ProgressBarComponent
  ],
  providers: [
    ProgressBarService
  ]
})
export class SharedModule {}
