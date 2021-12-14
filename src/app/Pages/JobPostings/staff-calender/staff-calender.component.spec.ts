import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCalenderComponent } from './staff-calender.component';

describe('StaffCalenderComponent', () => {
  let component: StaffCalenderComponent;
  let fixture: ComponentFixture<StaffCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
