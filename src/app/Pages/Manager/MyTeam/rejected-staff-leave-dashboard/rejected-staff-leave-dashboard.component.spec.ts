import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffLeaveDashboardComponent } from './rejected-staff-leave-dashboard.component';

describe('RejectedStaffLeaveDashboardComponent', () => {
  let component: RejectedStaffLeaveDashboardComponent;
  let fixture: ComponentFixture<RejectedStaffLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedStaffLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
