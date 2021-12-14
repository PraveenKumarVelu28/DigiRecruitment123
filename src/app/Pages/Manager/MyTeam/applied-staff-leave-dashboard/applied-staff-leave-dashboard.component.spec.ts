import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedStaffLeaveDashboardComponent } from './applied-staff-leave-dashboard.component';

describe('AppliedStaffLeaveDashboardComponent', () => {
  let component: AppliedStaffLeaveDashboardComponent;
  let fixture: ComponentFixture<AppliedStaffLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedStaffLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedStaffLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
