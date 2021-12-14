import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDashboardForAdminComponent } from './attendance-dashboard-for-admin.component';

describe('AttendanceDashboardForAdminComponent', () => {
  let component: AttendanceDashboardForAdminComponent;
  let fixture: ComponentFixture<AttendanceDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
