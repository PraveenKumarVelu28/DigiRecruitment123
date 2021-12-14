import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorDashboardForAdminComponent } from './locator-dashboard-for-admin.component';

describe('LocatorDashboardForAdminComponent', () => {
  let component: LocatorDashboardForAdminComponent;
  let fixture: ComponentFixture<LocatorDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
