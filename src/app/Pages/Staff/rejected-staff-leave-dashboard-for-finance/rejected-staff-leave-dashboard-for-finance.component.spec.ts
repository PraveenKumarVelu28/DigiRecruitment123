import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffLeaveDashboardForFinanceComponent } from './rejected-staff-leave-dashboard-for-finance.component';

describe('RejectedStaffLeaveDashboardForFinanceComponent', () => {
  let component: RejectedStaffLeaveDashboardForFinanceComponent;
  let fixture: ComponentFixture<RejectedStaffLeaveDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffLeaveDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffLeaveDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
