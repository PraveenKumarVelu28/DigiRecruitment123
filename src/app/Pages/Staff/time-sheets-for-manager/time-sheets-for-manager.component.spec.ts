import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsForManagerComponent } from './time-sheets-for-manager.component';

describe('TimeSheetsForManagerComponent', () => {
  let component: TimeSheetsForManagerComponent;
  let fixture: ComponentFixture<TimeSheetsForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetsForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
