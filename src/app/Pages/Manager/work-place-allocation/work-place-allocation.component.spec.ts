import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceAllocationComponent } from './work-place-allocation.component';

describe('WorkPlaceAllocationComponent', () => {
  let component: WorkPlaceAllocationComponent;
  let fixture: ComponentFixture<WorkPlaceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlaceAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
