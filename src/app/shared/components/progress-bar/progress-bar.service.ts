import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export type Visibility = 'visible' | 'hidden';

@Injectable()
export class ProgressBarService {
  visibility: BehaviorSubject<Visibility> = new BehaviorSubject('hidden' as Visibility);
  visibility$: Observable<Visibility> = this.visibility.asObservable();

  progress: BehaviorSubject<Number> = new BehaviorSubject(0);
  progress$: Observable<Number> = this.progress.asObservable();

  constructor(@Optional() @SkipSelf() prior: ProgressBarService) {
    if (prior) return prior;
  }

  showProgressBar() {
    this.visibility.next('visible' as Visibility);
  }

  hideProgressBar() {
    this.visibility.next('hidden' as Visibility);
  }

  updateProgress(progress: number) {
    this.progress.next(progress);
  }
}
