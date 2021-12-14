import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffLeaveDashboardForReceptionistComponent } from './rejected-staff-leave-dashboard-for-receptionist.component';

describe('RejectedStaffLeaveDashboardForReceptionistComponent', () => {
  let component: RejectedStaffLeaveDashboardForReceptionistComponent;
  let fixture: ComponentFixture<RejectedStaffLeaveDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffLeaveDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffLeaveDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
