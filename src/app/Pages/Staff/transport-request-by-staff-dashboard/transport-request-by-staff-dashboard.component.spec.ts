import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRequestByStaffDashboardComponent } from './transport-request-by-staff-dashboard.component';

describe('TransportRequestByStaffDashboardComponent', () => {
  let component: TransportRequestByStaffDashboardComponent;
  let fixture: ComponentFixture<TransportRequestByStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRequestByStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRequestByStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
