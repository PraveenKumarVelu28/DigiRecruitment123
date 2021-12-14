import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceRequestForAdminComponent } from './work-place-request-for-admin.component';

describe('WorkPlaceRequestForAdminComponent', () => {
  let component: WorkPlaceRequestForAdminComponent;
  let fixture: ComponentFixture<WorkPlaceRequestForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlaceRequestForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceRequestForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
