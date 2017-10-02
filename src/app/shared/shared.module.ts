import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ProgressBarComponent
  ],
  declarations: [
    ProgressBarComponent
  ]
})
export class SharedModule {}
