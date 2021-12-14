import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffLeaveComponent } from './admin-staff-leave.component';

describe('AdminStaffLeaveComponent', () => {
  let component: AdminStaffLeaveComponent;
  let fixture: ComponentFixture<AdminStaffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaffLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
