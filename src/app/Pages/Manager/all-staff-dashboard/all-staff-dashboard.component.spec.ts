import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffDashboardComponent } from './all-staff-dashboard.component';

describe('AllStaffDashboardComponent', () => {
  let component: AllStaffDashboardComponent;
  let fixture: ComponentFixture<AllStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
