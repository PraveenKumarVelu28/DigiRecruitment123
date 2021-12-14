import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsDashboardForStaffComponent } from './borrowings-dashboard-for-staff.component';

describe('BorrowingsDashboardForStaffComponent', () => {
  let component: BorrowingsDashboardForStaffComponent;
  let fixture: ComponentFixture<BorrowingsDashboardForStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsDashboardForStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingsDashboardForStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
