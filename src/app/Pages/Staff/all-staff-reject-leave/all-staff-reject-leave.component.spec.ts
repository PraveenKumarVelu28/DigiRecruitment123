import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffRejectLeaveComponent } from './all-staff-reject-leave.component';

describe('AllStaffRejectLeaveComponent', () => {
  let component: AllStaffRejectLeaveComponent;
  let fixture: ComponentFixture<AllStaffRejectLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffRejectLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffRejectLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
