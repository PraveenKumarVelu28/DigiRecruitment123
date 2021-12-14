import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffExpenseForFinanceDashbaordComponent } from './approved-staff-expense-for-finance-dashbaord.component';

describe('ApprovedStaffExpenseForFinanceDashbaordComponent', () => {
  let component: ApprovedStaffExpenseForFinanceDashbaordComponent;
  let fixture: ComponentFixture<ApprovedStaffExpenseForFinanceDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStaffExpenseForFinanceDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffExpenseForFinanceDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
