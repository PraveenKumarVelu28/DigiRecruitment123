import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRequestDashboardComponent } from './transport-request-dashboard.component';

describe('TransportRequestDashboardComponent', () => {
  let component: TransportRequestDashboardComponent;
  let fixture: ComponentFixture<TransportRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
