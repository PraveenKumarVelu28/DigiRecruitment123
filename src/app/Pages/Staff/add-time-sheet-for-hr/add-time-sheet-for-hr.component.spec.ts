import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeSheetForHRComponent } from './add-time-sheet-for-hr.component';

describe('AddTimeSheetForHRComponent', () => {
  let component: AddTimeSheetForHRComponent;
  let fixture: ComponentFixture<AddTimeSheetForHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimeSheetForHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimeSheetForHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
