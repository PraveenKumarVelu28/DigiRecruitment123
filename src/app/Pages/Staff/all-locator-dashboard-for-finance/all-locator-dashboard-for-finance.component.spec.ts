import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLocatorDashboardForFinanceComponent } from './all-locator-dashboard-for-finance.component';

describe('AllLocatorDashboardForFinanceComponent', () => {
  let component: AllLocatorDashboardForFinanceComponent;
  let fixture: ComponentFixture<AllLocatorDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLocatorDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLocatorDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
