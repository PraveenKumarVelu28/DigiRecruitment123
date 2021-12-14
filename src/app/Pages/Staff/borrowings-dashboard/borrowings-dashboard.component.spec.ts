import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsDashboardComponent } from './borrowings-dashboard.component';

describe('BorrowingsDashboardComponent', () => {
  let component: BorrowingsDashboardComponent;
  let fixture: ComponentFixture<BorrowingsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
