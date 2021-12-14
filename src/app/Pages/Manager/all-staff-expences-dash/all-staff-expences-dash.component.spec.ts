WorkPlaceAllocationimport { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStaffExpencesDashComponent } from './all-staff-expences-dash.component';

describe('AllStaffExpencesDashComponent', () => {
  let component: AllStaffExpencesDashComponent;
  let fixture: ComponentFixture<AllStaffExpencesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStaffExpencesDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffExpencesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
