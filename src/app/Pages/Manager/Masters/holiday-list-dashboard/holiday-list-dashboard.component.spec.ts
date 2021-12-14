import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListDashboardComponent } from './holiday-list-dashboard.component';

describe('HolidayListDashboardComponent', () => {
  let component: HolidayListDashboardComponent;
  let fixture: ComponentFixture<HolidayListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayListDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
