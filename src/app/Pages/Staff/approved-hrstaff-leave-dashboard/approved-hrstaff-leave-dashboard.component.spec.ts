import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedHRStaffLeaveDashboardComponent } from './approved-hrstaff-leave-dashboard.component';

describe('ApprovedHRStaffLeaveDashboardComponent', () => {
  let component: ApprovedHRStaffLeaveDashboardComponent;
  let fixture: ComponentFixture<ApprovedHRStaffLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedHRStaffLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedHRStaffLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
