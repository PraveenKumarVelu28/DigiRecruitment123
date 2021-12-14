import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRequestForAdminComponent } from './visitor-request-for-admin.component';

describe('VisitorRequestForAdminComponent', () => {
  let component: VisitorRequestForAdminComponent;
  let fixture: ComponentFixture<VisitorRequestForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorRequestForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRequestForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
