import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedStaffExpenseForAdminDashboardComponent } from './raised-staff-expense-for-admin-dashboard.component';

describe('RaisedStaffExpenseForAdminDashboardComponent', () => {
  let component: RaisedStaffExpenseForAdminDashboardComponent;
  let fixture: ComponentFixture<RaisedStaffExpenseForAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedStaffExpenseForAdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedStaffExpenseForAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
