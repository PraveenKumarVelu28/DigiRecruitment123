import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTransportRequestForReceptionistComponent } from './booked-transport-request-for-receptionist.component';

describe('BookedTransportRequestForReceptionistComponent', () => {
  let component: BookedTransportRequestForReceptionistComponent;
  let fixture: ComponentFixture<BookedTransportRequestForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTransportRequestForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTransportRequestForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
