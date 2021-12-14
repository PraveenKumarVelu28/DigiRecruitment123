import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsBYStaffComponent } from './borrowings-bystaff.component';

describe('BorrowingsBYStaffComponent', () => {
  let component: BorrowingsBYStaffComponent;
  let fixture: ComponentFixture<BorrowingsBYStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsBYStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingsBYStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
