import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedStaffLeaveDashboardForHRComponent } from './applied-staff-leave-dashboard-for-hr.component';

describe('AppliedStaffLeaveDashboardForHRComponent', () => {
  let component: AppliedStaffLeaveDashboardForHRComponent;
  let fixture: ComponentFixture<AppliedStaffLeaveDashboardForHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedStaffLeaveDashboardForHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedStaffLeaveDashboardForHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
