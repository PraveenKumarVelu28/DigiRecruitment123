import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLookupComponent } from './staff-lookup.component';

describe('StaffLookupComponent', () => {
  let component: StaffLookupComponent;
  let fixture: ComponentFixture<StaffLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
