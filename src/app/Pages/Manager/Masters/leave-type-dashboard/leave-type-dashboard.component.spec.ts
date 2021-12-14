import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeDashboardComponent } from './leave-type-dashboard.component';

describe('LeaveTypeDashboardComponent', () => {
  let component: LeaveTypeDashboardComponent;
  let fixture: ComponentFixture<LeaveTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
