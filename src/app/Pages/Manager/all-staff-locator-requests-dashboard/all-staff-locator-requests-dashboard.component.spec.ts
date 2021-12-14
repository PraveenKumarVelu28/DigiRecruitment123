import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffLocatorRequestsDashboardComponent } from './all-staff-locator-requests-dashboard.component';

describe('AllStaffLocatorRequestsDashboardComponent', () => {
  let component: AllStaffLocatorRequestsDashboardComponent;
  let fixture: ComponentFixture<AllStaffLocatorRequestsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffLocatorRequestsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffLocatorRequestsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
