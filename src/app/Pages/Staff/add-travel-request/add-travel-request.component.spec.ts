import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelRequestComponent } from './add-travel-request.component';

describe('AddTravelRequestComponent', () => {
  let component: AddTravelRequestComponent;
  let fixture: ComponentFixture<AddTravelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
