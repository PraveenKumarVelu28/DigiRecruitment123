import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedHRStaffLeaveDashboardComponent } from './rejected-hrstaff-leave-dashboard.component';

describe('RejectedHRStaffLeaveDashboardComponent', () => {
  let component: RejectedHRStaffLeaveDashboardComponent;
  let fixture: ComponentFixture<RejectedHRStaffLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedHRStaffLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedHRStaffLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
