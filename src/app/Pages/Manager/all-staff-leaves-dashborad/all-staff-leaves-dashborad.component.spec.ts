import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffLeavesDashboradComponent } from './all-staff-leaves-dashborad.component';

describe('AllStaffLeavesDashboradComponent', () => {
  let component: AllStaffLeavesDashboradComponent;
  let fixture: ComponentFixture<AllStaffLeavesDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffLeavesDashboradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffLeavesDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
