import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLookUpDashboardComponent } from './staff-look-up-dashboard.component';

describe('StaffLookUpDashboardComponent', () => {
  let component: StaffLookUpDashboardComponent;
  let fixture: ComponentFixture<StaffLookUpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLookUpDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLookUpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
