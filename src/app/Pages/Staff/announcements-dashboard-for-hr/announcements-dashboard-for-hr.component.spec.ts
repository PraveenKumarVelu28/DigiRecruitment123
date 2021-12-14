import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsDashboardForHRComponent } from './announcements-dashboard-for-hr.component';

describe('AnnouncementsDashboardForHRComponent', () => {
  let component: AnnouncementsDashboardForHRComponent;
  let fixture: ComponentFixture<AnnouncementsDashboardForHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsDashboardForHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsDashboardForHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
