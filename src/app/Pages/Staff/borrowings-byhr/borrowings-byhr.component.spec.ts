import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsBYHRComponent } from './borrowings-byhr.component';

describe('BorrowingsBYHRComponent', () => {
  let component: BorrowingsBYHRComponent;
  let fixture: ComponentFixture<BorrowingsBYHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsBYHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingsBYHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
