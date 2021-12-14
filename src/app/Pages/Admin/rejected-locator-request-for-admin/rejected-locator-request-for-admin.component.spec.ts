import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedLocatorRequestForAdminComponent } from './rejected-locator-request-for-admin.component';

describe('RejectedLocatorRequestForAdminComponent', () => {
  let component: RejectedLocatorRequestForAdminComponent;
  let fixture: ComponentFixture<RejectedLocatorRequestForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedLocatorRequestForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedLocatorRequestForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
