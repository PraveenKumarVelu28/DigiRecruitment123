import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffExpenseForManagerDashbaordComponent } from './approved-staff-expense-for-manager-dashbaord.component';

describe('ApprovedStaffExpenseForManagerDashbaordComponent', () => {
  let component: ApprovedStaffExpenseForManagerDashbaordComponent;
  let fixture: ComponentFixture<ApprovedStaffExpenseForManagerDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStaffExpenseForManagerDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffExpenseForManagerDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
