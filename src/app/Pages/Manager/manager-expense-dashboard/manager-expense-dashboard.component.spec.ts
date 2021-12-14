import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerExpenseDashboardComponent } from './manager-expense-dashboard.component';

describe('ManagerExpenseDashboardComponent', () => {
  let component: ManagerExpenseDashboardComponent;
  let fixture: ComponentFixture<ManagerExpenseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerExpenseDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerExpenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
