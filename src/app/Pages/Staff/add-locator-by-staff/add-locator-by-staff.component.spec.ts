import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocatorByStaffComponent } from './add-locator-by-staff.component';

describe('AddLocatorByStaffComponent', () => {
  let component: AddLocatorByStaffComponent;
  let fixture: ComponentFixture<AddLocatorByStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocatorByStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocatorByStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
