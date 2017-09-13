import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEntryComponent } from './blog-entry.component';

describe('PostDetailComponent', () => {
  let component: BlogEntryComponent;
  let fixture: ComponentFixture<BlogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
