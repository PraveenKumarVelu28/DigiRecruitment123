import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignedStaffComponent } from './resigned-staff.component';

describe('ResignedStaffComponent', () => {
  let component: ResignedStaffComponent;
  let fixture: ComponentFixture<ResignedStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignedStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignedStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
