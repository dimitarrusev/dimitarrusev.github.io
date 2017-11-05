import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './shared';

@Component({
  selector: 'dr-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  isHidden: boolean;

  constructor(public progressBarService: ProgressBarService) {}

  ngOnInit() {}
}
