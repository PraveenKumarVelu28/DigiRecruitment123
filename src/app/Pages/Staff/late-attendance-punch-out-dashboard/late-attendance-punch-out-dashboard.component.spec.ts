import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateAttendancePunchOutDashboardComponent } from './late-attendance-punch-out-dashboard.component';

describe('LateAttendancePunchOutDashboardComponent', () => {
  let component: LateAttendancePunchOutDashboardComponent;
  let fixture: ComponentFixture<LateAttendancePunchOutDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateAttendancePunchOutDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateAttendancePunchOutDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
