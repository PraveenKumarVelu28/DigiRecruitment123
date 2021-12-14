import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveDetailsDashboardComponent } from './staff-leave-details-dashboard.component';

describe('StaffLeaveDetailsDashboardComponent', () => {
  let component: StaffLeaveDetailsDashboardComponent;
  let fixture: ComponentFixture<StaffLeaveDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLeaveDetailsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLeaveDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
