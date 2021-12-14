import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForManagerComponent } from './upcoming-announcements-dashboard-for-manager.component';

describe('UpcomingAnnouncementsDashboardForManagerComponent', () => {
  let component: UpcomingAnnouncementsDashboardForManagerComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
