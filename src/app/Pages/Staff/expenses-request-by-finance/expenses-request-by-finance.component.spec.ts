import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesRequestByFinanceComponent } from './expenses-request-by-finance.component';

describe('ExpensesRequestByFinanceComponent', () => {
  let component: ExpensesRequestByFinanceComponent;
  let fixture: ComponentFixture<ExpensesRequestByFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesRequestByFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesRequestByFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
