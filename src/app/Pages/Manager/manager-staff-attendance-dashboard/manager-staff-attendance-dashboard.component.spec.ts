import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStaffAttendanceDashboardComponent } from './manager-staff-attendance-dashboard.component';

describe('ManagerStaffAttendanceDashboardComponent', () => {
  let component: ManagerStaffAttendanceDashboardComponent;
  let fixture: ComponentFixture<ManagerStaffAttendanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerStaffAttendanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStaffAttendanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
