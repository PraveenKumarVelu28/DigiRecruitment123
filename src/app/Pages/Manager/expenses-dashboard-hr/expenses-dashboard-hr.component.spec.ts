import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDashboardHRComponent } from './expenses-dashboard-hr.component';

describe('ExpensesDashboardHRComponent', () => {
  let component: ExpensesDashboardHRComponent;
  let fixture: ComponentFixture<ExpensesDashboardHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesDashboardHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDashboardHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
