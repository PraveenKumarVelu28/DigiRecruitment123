import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffLeaveDashboardForReceptionistComponent } from './approved-staff-leave-dashboard-for-receptionist.component';

describe('ApprovedStaffLeaveDashboardForReceptionistComponent', () => {
  let component: ApprovedStaffLeaveDashboardForReceptionistComponent;
  let fixture: ComponentFixture<ApprovedStaffLeaveDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStaffLeaveDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffLeaveDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
