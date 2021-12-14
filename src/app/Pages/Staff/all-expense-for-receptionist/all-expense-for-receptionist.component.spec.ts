import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpenseForReceptionistComponent } from './all-expense-for-receptionist.component';

describe('AllExpenseForReceptionistComponent', () => {
  let component: AllExpenseForReceptionistComponent;
  let fixture: ComponentFixture<AllExpenseForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExpenseForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpenseForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
