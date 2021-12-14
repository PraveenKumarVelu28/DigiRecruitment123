import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiedExpenseForFinanceDashboardComponent } from './rasied-expense-for-finance-dashboard.component';

describe('RasiedExpenseForFinanceDashboardComponent', () => {
  let component: RasiedExpenseForFinanceDashboardComponent;
  let fixture: ComponentFixture<RasiedExpenseForFinanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiedExpenseForFinanceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasiedExpenseForFinanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
