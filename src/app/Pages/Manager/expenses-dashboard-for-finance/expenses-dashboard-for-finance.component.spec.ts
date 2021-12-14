import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDashboardForFinanceComponent } from './expenses-dashboard-for-finance.component';

describe('ExpensesDashboardForFinanceComponent', () => {
  let component: ExpensesDashboardForFinanceComponent;
  let fixture: ComponentFixture<ExpensesDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
