import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRLeaveDashboardComponent } from './hrleave-dashboard.component';

describe('HRLeaveDashboardComponent', () => {
  let component: HRLeaveDashboardComponent;
  let fixture: ComponentFixture<HRLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
