import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffLeaveForFinanceComponent } from './all-staff-leave-for-finance.component';

describe('AllStaffLeaveForFinanceComponent', () => {
  let component: AllStaffLeaveForFinanceComponent;
  let fixture: ComponentFixture<AllStaffLeaveForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffLeaveForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffLeaveForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
