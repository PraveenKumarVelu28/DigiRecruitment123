import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffExpenseForFinanceDashboardComponent } from './rejected-staff-expense-for-finance-dashboard.component';

describe('RejectedStaffExpenseForFinanceDashboardComponent', () => {
  let component: RejectedStaffExpenseForFinanceDashboardComponent;
  let fixture: ComponentFixture<RejectedStaffExpenseForFinanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffExpenseForFinanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffExpenseForFinanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
