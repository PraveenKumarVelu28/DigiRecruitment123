import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsDashboardComponent } from './announcements-dashboard.component';

describe('AnnouncementsDashboardComponent', () => {
  let component: AnnouncementsDashboardComponent;
  let fixture: ComponentFixture<AnnouncementsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
