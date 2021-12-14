import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorRequestDashboardComponent } from './locator-request-dashboard.component';

describe('LocatorRequestDashboardComponent', () => {
  let component: LocatorRequestDashboardComponent;
  let fixture: ComponentFixture<LocatorRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
