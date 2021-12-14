import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLocatorDashboardForAdminComponent } from './all-locator-dashboard-for-admin.component';

describe('AllLocatorDashboardForAdminComponent', () => {
  let component: AllLocatorDashboardForAdminComponent;
  let fixture: ComponentFixture<AllLocatorDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLocatorDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLocatorDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
