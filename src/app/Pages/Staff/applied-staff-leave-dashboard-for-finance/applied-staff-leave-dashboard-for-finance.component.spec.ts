import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedStaffLeaveDashboardForFinanceComponent } from './applied-staff-leave-dashboard-for-finance.component';

describe('AppliedStaffLeaveDashboardForFinanceComponent', () => {
  let component: AppliedStaffLeaveDashboardForFinanceComponent;
  let fixture: ComponentFixture<AppliedStaffLeaveDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedStaffLeaveDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedStaffLeaveDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
