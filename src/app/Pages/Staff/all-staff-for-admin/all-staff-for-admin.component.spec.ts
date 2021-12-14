import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffForAdminComponent } from './all-staff-for-admin.component';

describe('AllStaffForAdminComponent', () => {
  let component: AllStaffForAdminComponent;
  let fixture: ComponentFixture<AllStaffForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
