import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRaisedExpenseComponent } from './all-raised-expense.component';

describe('AllRaisedExpenseComponent', () => {
  let component: AllRaisedExpenseComponent;
  let fixture: ComponentFixture<AllRaisedExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRaisedExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRaisedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
