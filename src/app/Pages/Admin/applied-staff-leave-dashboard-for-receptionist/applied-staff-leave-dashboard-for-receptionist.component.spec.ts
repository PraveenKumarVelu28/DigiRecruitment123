import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedStaffLeaveDashboardForReceptionistComponent } from './applied-staff-leave-dashboard-for-receptionist.component';

describe('AppliedStaffLeaveDashboardForReceptionistComponent', () => {
  let component: AppliedStaffLeaveDashboardForReceptionistComponent;
  let fixture: ComponentFixture<AppliedStaffLeaveDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedStaffLeaveDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedStaffLeaveDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
