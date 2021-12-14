import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedTransportRequestForReceptionistComponent } from './raised-transport-request-for-receptionist.component';

describe('RaisedTransportRequestForReceptionistComponent', () => {
  let component: RaisedTransportRequestForReceptionistComponent;
  let fixture: ComponentFixture<RaisedTransportRequestForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedTransportRequestForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedTransportRequestForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
