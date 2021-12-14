import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsDashboardForHRComponent } from './borrowings-dashboard-for-hr.component';

describe('BorrowingsDashboardForHRComponent', () => {
  let component: BorrowingsDashboardForHRComponent;
  let fixture: ComponentFixture<BorrowingsDashboardForHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsDashboardForHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingsDashboardForHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
