import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetForFinanceComponent } from './time-sheet-for-finance.component';

describe('TimeSheetForFinanceComponent', () => {
  let component: TimeSheetForFinanceComponent;
  let fixture: ComponentFixture<TimeSheetForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
