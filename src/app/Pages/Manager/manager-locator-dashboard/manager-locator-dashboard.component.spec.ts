import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLocatorDashboardComponent } from './manager-locator-dashboard.component';

describe('ManagerLocatorDashboardComponent', () => {
  let component: ManagerLocatorDashboardComponent;
  let fixture: ComponentFixture<ManagerLocatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLocatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLocatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
