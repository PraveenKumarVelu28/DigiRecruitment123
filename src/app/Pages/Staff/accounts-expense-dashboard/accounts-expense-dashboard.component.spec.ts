import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsExpenseDashboardComponent } from './accounts-expense-dashboard.component';

describe('AccountsExpenseDashboardComponent', () => {
  let component: AccountsExpenseDashboardComponent;
  let fixture: ComponentFixture<AccountsExpenseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsExpenseDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsExpenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
