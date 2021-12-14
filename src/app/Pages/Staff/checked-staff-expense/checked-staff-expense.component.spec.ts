import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedStaffExpenseComponent } from './checked-staff-expense.component';

describe('CheckedStaffExpenseComponent', () => {
  let component: CheckedStaffExpenseComponent;
  let fixture: ComponentFixture<CheckedStaffExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedStaffExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedStaffExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
