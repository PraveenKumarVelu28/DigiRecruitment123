import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForReceptionistComponent } from './upcoming-announcements-dashboard-for-receptionist.component';

describe('UpcomingAnnouncementsDashboardForReceptionistComponent', () => {
  let component: UpcomingAnnouncementsDashboardForReceptionistComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
