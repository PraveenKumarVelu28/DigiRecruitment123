import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffApprovedLeaveComponent } from './all-staff-approved-leave.component';

describe('AllStaffApprovedLeaveComponent', () => {
  let component: AllStaffApprovedLeaveComponent;
  let fixture: ComponentFixture<AllStaffApprovedLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffApprovedLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffApprovedLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
