import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAnnouncementsDashboardForAdminComponent } from './completed-announcements-dashboard-for-admin.component';

describe('CompletedAnnouncementsDashboardForAdminComponent', () => {
  let component: CompletedAnnouncementsDashboardForAdminComponent;
  let fixture: ComponentFixture<CompletedAnnouncementsDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedAnnouncementsDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedAnnouncementsDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
