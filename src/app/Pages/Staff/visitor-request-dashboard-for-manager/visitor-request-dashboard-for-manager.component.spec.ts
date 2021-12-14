import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRequestDashboardForManagerComponent } from './visitor-request-dashboard-for-manager.component';

describe('VisitorRequestDashboardForManagerComponent', () => {
  let component: VisitorRequestDashboardForManagerComponent;
  let fixture: ComponentFixture<VisitorRequestDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorRequestDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRequestDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
