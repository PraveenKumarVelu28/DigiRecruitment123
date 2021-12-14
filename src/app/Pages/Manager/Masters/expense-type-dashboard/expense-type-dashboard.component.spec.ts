import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeDashboardComponent } from './expense-type-dashboard.component';

describe('ExpenseTypeDashboardComponent', () => {
  let component: ExpenseTypeDashboardComponent;
  let fixture: ComponentFixture<ExpenseTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseTypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
