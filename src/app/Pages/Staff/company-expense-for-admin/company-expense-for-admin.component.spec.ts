import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyExpenseForAdminComponent } from './company-expense-for-admin.component';

describe('CompanyExpenseForAdminComponent', () => {
  let component: CompanyExpenseForAdminComponent;
  let fixture: ComponentFixture<CompanyExpenseForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyExpenseForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyExpenseForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
