import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffLeaveForAdminComponent } from './all-staff-leave-for-admin.component';

describe('AllStaffLeaveForAdminComponent', () => {
  let component: AllStaffLeaveForAdminComponent;
  let fixture: ComponentFixture<AllStaffLeaveForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffLeaveForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffLeaveForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
