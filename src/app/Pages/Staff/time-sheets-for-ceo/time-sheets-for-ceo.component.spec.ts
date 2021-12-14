import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsForCEOComponent } from './time-sheets-for-ceo.component';

describe('TimeSheetsForCEOComponent', () => {
  let component: TimeSheetsForCEOComponent;
  let fixture: ComponentFixture<TimeSheetsForCEOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetsForCEOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsForCEOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
