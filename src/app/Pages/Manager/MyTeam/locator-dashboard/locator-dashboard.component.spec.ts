import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorDashboardComponent } from './locator-dashboard.component';

describe('LocatorDashboardComponent', () => {
  let component: LocatorDashboardComponent;
  let fixture: ComponentFixture<LocatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
