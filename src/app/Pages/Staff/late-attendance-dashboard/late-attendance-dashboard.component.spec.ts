import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateAttendanceDashboardComponent } from './late-attendance-dashboard.component';

describe('LateAttendanceDashboardComponent', () => {
  let component: LateAttendanceDashboardComponent;
  let fixture: ComponentFixture<LateAttendanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateAttendanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateAttendanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
