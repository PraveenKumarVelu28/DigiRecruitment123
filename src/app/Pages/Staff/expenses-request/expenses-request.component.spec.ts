import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesRequestComponent } from './expenses-request.component';

describe('ExpensesRequestComponent', () => {
  let component: ExpensesRequestComponent;
  let fixture: ComponentFixture<ExpensesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
