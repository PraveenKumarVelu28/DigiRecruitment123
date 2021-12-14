import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTransportRequestForReceptionistComponent } from './completed-transport-request-for-receptionist.component';

describe('CompletedTransportRequestForReceptionistComponent', () => {
  let component: CompletedTransportRequestForReceptionistComponent;
  let fixture: ComponentFixture<CompletedTransportRequestForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTransportRequestForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTransportRequestForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
