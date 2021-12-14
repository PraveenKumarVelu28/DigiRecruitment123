import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffAttendanceDashboardComponent } from './all-staff-attendance-dashboard.component';

describe('AllStaffAttendanceDashboardComponent', () => {
  let component: AllStaffAttendanceDashboardComponent;
  let fixture: ComponentFixture<AllStaffAttendanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffAttendanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffAttendanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
