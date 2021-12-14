import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingEventsDashboardForFinanceComponent } from './up-coming-events-dashboard-for-finance.component';

describe('UpComingEventsDashboardForFinanceComponent', () => {
  let component: UpComingEventsDashboardForFinanceComponent;
  let fixture: ComponentFixture<UpComingEventsDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingEventsDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingEventsDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
