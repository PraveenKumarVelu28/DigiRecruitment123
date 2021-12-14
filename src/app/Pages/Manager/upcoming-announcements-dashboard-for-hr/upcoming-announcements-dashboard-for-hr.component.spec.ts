import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForHrComponent } from './upcoming-announcements-dashboard-for-hr.component';

describe('UpcomingAnnouncementsDashboardForHrComponent', () => {
  let component: UpcomingAnnouncementsDashboardForHrComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
