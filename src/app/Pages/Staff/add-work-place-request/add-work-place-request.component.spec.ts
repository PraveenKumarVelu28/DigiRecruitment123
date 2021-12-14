import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkPlaceRequestComponent } from './add-work-place-request.component';

describe('AddWorkPlaceRequestComponent', () => {
  let component: AddWorkPlaceRequestComponent;
  let fixture: ComponentFixture<AddWorkPlaceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkPlaceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkPlaceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
