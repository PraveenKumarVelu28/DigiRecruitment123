import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashbaordComponent } from './staff-dashbaord.component';

describe('StaffDashbaordComponent', () => {
  let component: StaffDashbaordComponent;
  let fixture: ComponentFixture<StaffDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
