import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkboxComponent } from './remarkbox.component';

describe('RemarkboxComponent', () => {
  let component: RemarkboxComponent;
  let fixture: ComponentFixture<RemarkboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarkboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
