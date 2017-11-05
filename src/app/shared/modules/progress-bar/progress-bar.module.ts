import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarService } from './shared';
import { ProgressBarComponent } from './progress-bar.component';

export { ProgressBarService } from './shared';

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
export class ProgressBarModule {}
