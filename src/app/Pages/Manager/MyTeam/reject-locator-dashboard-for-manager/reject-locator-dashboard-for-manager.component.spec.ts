import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectLocatorDashboardForManagerComponent } from './reject-locator-dashboard-for-manager.component';

describe('RejectLocatorDashboardForManagerComponent', () => {
  let component: RejectLocatorDashboardForManagerComponent;
  let fixture: ComponentFixture<RejectLocatorDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectLocatorDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectLocatorDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
