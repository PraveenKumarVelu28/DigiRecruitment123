import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffExpenseForAdminDashbaordComponent } from './approved-staff-expense-for-admin-dashbaord.component';

describe('ApprovedStaffExpenseForAdminDashbaordComponent', () => {
  let component: ApprovedStaffExpenseForAdminDashbaordComponent;
  let fixture: ComponentFixture<ApprovedStaffExpenseForAdminDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStaffExpenseForAdminDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffExpenseForAdminDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
