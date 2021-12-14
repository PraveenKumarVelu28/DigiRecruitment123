import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceRequestCompletedComponent } from './work-place-request-completed.component';

describe('WorkPlaceRequestCompletedComponent', () => {
  let component: WorkPlaceRequestCompletedComponent;
  let fixture: ComponentFixture<WorkPlaceRequestCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlaceRequestCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceRequestCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
