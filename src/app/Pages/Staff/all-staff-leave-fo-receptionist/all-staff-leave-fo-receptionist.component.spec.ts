import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffLeaveFoReceptionistComponent } from './all-staff-leave-fo-receptionist.component';

describe('AllStaffLeaveFoReceptionistComponent', () => {
  let component: AllStaffLeaveFoReceptionistComponent;
  let fixture: ComponentFixture<AllStaffLeaveFoReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffLeaveFoReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffLeaveFoReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
