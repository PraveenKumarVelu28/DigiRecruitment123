import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedLocatorDashboardComponent } from './rejected-locator-dashboard.component';

describe('RejectedLocatorDashboardComponent', () => {
  let component: RejectedLocatorDashboardComponent;
  let fixture: ComponentFixture<RejectedLocatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedLocatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedLocatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
