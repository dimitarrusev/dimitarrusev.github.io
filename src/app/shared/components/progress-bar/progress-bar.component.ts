import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

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
