import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStaffDashboardComponent } from './my-staff-dashboard.component';

describe('MyStaffDashboardComponent', () => {
  let component: MyStaffDashboardComponent;
  let fixture: ComponentFixture<MyStaffDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStaffDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
