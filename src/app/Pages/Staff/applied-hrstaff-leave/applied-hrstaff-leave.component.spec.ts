import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedHRStaffLeaveComponent } from './applied-hrstaff-leave.component';

describe('AppliedHRStaffLeaveComponent', () => {
  let component: AppliedHRStaffLeaveComponent;
  let fixture: ComponentFixture<AppliedHRStaffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedHRStaffLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedHRStaffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
