import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffLeaveDashboardForFinanceComponent } from './approved-staff-leave-dashboard-for-finance.component';

describe('ApprovedStaffLeaveDashboardForFinanceComponent', () => {
  let component: ApprovedStaffLeaveDashboardForFinanceComponent;
  let fixture: ComponentFixture<ApprovedStaffLeaveDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStaffLeaveDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffLeaveDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
