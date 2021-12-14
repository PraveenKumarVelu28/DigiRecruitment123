import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRequestDashboardComponent } from './visitor-request-dashboard.component';

describe('VisitorRequestDashboardComponent', () => {
  let component: VisitorRequestDashboardComponent;
  let fixture: ComponentFixture<VisitorRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
