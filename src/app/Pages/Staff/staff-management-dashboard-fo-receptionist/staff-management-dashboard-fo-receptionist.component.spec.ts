import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementDashboardFoReceptionistComponent } from './staff-management-dashboard-fo-receptionist.component';

describe('StaffManagementDashboardFoReceptionistComponent', () => {
  let component: StaffManagementDashboardFoReceptionistComponent;
  let fixture: ComponentFixture<StaffManagementDashboardFoReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffManagementDashboardFoReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementDashboardFoReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
