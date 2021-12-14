import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceRequestComponent } from './work-place-request.component';

describe('WorkPlaceRequestComponent', () => {
  let component: WorkPlaceRequestComponent;
  let fixture: ComponentFixture<WorkPlaceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlaceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
