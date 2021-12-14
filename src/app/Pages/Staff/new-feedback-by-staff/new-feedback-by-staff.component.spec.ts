import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedbackByStaffComponent } from './new-feedback-by-staff.component';

describe('NewFeedbackByStaffComponent', () => {
  let component: NewFeedbackByStaffComponent;
  let fixture: ComponentFixture<NewFeedbackByStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFeedbackByStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedbackByStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
