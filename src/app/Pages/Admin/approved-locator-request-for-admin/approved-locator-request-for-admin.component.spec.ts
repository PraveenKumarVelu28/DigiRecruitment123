import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLocatorRequestForAdminComponent } from './approved-locator-request-for-admin.component';

describe('ApprovedLocatorRequestForAdminComponent', () => {
  let component: ApprovedLocatorRequestForAdminComponent;
  let fixture: ComponentFixture<ApprovedLocatorRequestForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedLocatorRequestForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedLocatorRequestForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
