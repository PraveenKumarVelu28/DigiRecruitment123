import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLocatorDashboardForReceptionistComponent } from './all-locator-dashboard-for-receptionist.component';

describe('AllLocatorDashboardForReceptionistComponent', () => {
  let component: AllLocatorDashboardForReceptionistComponent;
  let fixture: ComponentFixture<AllLocatorDashboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLocatorDashboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLocatorDashboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
