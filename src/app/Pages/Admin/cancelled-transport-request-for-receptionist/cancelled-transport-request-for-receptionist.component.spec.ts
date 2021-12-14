import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTransportRequestForReceptionistComponent } from './cancelled-transport-request-for-receptionist.component';

describe('CancelledTransportRequestForReceptionistComponent', () => {
  let component: CancelledTransportRequestForReceptionistComponent;
  let fixture: ComponentFixture<CancelledTransportRequestForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledTransportRequestForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledTransportRequestForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
