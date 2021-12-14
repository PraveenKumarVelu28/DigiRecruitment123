import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLocatorDashboardForManagerComponent } from './team-locator-dashboard-for-manager.component';

describe('TeamLocatorDashboardForManagerComponent', () => {
  let component: TeamLocatorDashboardForManagerComponent;
  let fixture: ComponentFixture<TeamLocatorDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLocatorDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLocatorDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
