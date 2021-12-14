import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRequestForAdminComponent } from './transport-request-for-admin.component';

describe('TransportRequestForAdminComponent', () => {
  let component: TransportRequestForAdminComponent;
  let fixture: ComponentFixture<TransportRequestForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRequestForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRequestForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
