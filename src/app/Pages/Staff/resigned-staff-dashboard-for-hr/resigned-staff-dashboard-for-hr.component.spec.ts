import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignedStaffDashboardForHrComponent } from './resigned-staff-dashboard-for-hr.component';

describe('ResignedStaffDashboardForHrComponent', () => {
  let component: ResignedStaffDashboardForHrComponent;
  let fixture: ComponentFixture<ResignedStaffDashboardForHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignedStaffDashboardForHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignedStaffDashboardForHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
