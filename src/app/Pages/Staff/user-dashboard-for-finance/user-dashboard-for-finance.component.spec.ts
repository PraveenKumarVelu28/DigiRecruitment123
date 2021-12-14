import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardForFinanceComponent } from './user-dashboard-for-finance.component';

describe('UserDashboardForFinanceComponent', () => {
  let component: UserDashboardForFinanceComponent;
  let fixture: ComponentFixture<UserDashboardForFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardForFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardForFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
