import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffExpenseForManagerDashboardComponent } from './rejected-staff-expense-for-manager-dashboard.component';

describe('RejectedStaffExpenseForManagerDashboardComponent', () => {
  let component: RejectedStaffExpenseForManagerDashboardComponent;
  let fixture: ComponentFixture<RejectedStaffExpenseForManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffExpenseForManagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffExpenseForManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
