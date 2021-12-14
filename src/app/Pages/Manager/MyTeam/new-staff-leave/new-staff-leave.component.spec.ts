import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffLeaveComponent } from './new-staff-leave.component';

describe('NewStaffLeaveComponent', () => {
  let component: NewStaffLeaveComponent;
  let fixture: ComponentFixture<NewStaffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStaffLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
