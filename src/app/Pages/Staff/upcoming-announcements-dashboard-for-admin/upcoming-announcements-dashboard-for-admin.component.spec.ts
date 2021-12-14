import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForAdminComponent } from './upcoming-announcements-dashboard-for-admin.component';

describe('UpcomingAnnouncementsDashboardForAdminComponent', () => {
  let component: UpcomingAnnouncementsDashboardForAdminComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
