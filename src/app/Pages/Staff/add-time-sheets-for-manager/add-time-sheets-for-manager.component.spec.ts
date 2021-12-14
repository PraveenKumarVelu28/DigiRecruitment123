import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeSheetsForManagerComponent } from './add-time-sheets-for-manager.component';

describe('AddTimeSheetsForManagerComponent', () => {
  let component: AddTimeSheetsForManagerComponent;
  let fixture: ComponentFixture<AddTimeSheetsForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimeSheetsForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimeSheetsForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
