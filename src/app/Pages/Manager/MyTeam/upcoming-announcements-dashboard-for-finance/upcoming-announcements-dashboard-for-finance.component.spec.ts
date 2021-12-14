import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnnouncementsDashboardForFinanceComponent } from './upcoming-announcements-dashboard-for-finance.component';

describe('UpcomingAnnouncementsDashboardForFinanceComponent', () => {
  let component: UpcomingAnnouncementsDashboardForFinanceComponent;
  let fixture: ComponentFixture<UpcomingAnnouncementsDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingAnnouncementsDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAnnouncementsDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
