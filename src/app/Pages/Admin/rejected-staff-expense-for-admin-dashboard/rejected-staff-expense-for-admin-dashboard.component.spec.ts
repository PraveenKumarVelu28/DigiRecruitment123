import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffExpenseForAdminDashboardComponent } from './rejected-staff-expense-for-admin-dashboard.component';

describe('RejectedStaffExpenseForAdminDashboardComponent', () => {
  let component: RejectedStaffExpenseForAdminDashboardComponent;
  let fixture: ComponentFixture<RejectedStaffExpenseForAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffExpenseForAdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffExpenseForAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
