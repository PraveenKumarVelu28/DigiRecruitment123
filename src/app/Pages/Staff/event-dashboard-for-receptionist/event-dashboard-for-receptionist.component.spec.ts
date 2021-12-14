import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDashboardForReceptionistComponent } from './event-dashboard-for-receptionist.component';

describe('EventDashboardForReceptionistComponent', () => {
  let component: EventDashboardForReceptionistComponent;
  let fixture: ComponentFixture<EventDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
