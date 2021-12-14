import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveDashboardComponent } from './staff-leave-dashboard.component';

describe('StaffLeaveDashboardComponent', () => {
  let component: StaffLeaveDashboardComponent;
  let fixture: ComponentFixture<StaffLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
