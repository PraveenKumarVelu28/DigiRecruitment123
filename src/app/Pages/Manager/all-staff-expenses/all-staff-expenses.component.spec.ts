import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffExpensesComponent } from './all-staff-expenses.component';

describe('AllStaffExpensesComponent', () => {
  let component: AllStaffExpensesComponent;
  let fixture: ComponentFixture<AllStaffExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
