import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForStaffComponent } from './upcoming-announcements-dashboard-for-staff.component';

describe('UpcomingAnnouncementsDashboardForStaffComponent', () => {
  let component: UpcomingAnnouncementsDashboardForStaffComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
