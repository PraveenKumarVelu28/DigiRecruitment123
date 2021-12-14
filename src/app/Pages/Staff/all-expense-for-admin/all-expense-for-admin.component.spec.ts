import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpenseForAdminComponent } from './all-expense-for-admin.component';

describe('AllExpenseForAdminComponent', () => {
  let component: AllExpenseForAdminComponent;
  let fixture: ComponentFixture<AllExpenseForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExpenseForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpenseForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
