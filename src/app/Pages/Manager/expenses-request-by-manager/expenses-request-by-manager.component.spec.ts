import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesRequestByManagerComponent } from './expenses-request-by-manager.component';

describe('ExpensesRequestByManagerComponent', () => {
  let component: ExpensesRequestByManagerComponent;
  let fixture: ComponentFixture<ExpensesRequestByManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesRequestByManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesRequestByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
