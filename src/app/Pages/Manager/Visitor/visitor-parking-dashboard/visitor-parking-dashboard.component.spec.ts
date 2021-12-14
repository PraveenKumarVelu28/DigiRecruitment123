import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorParkingDashboardComponent } from './visitor-parking-dashboard.component';

describe('VisitorParkingDashboardComponent', () => {
  let component: VisitorParkingDashboardComponent;
  let fixture: ComponentFixture<VisitorParkingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorParkingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorParkingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
