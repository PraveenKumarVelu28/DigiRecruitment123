import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventsDashboardForAdminComponent } from './upcoming-events-dashboard-for-admin.component';

describe('UpcomingEventsDashboardForAdminComponent', () => {
  let component: UpcomingEventsDashboardForAdminComponent;
  let fixture: ComponentFixture<UpcomingEventsDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingEventsDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingEventsDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
