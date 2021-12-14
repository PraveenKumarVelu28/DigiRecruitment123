import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceIndicatorDashboardComponent } from './performance-indicator-dashboard.component';

describe('PerformanceIndicatorDashboardComponent', () => {
  let component: PerformanceIndicatorDashboardComponent;
  let fixture: ComponentFixture<PerformanceIndicatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceIndicatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceIndicatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
