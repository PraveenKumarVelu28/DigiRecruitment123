import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsForHrComponent } from './time-sheets-for-hr.component';

describe('TimeSheetsForHrComponent', () => {
  let component: TimeSheetsForHrComponent;
  let fixture: ComponentFixture<TimeSheetsForHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetsForHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsForHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
