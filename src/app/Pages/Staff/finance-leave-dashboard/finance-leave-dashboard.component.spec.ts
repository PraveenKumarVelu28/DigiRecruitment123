import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceLeaveDashboardComponent } from './finance-leave-dashboard.component';

describe('FinanceLeaveDashboardComponent', () => {
  let component: FinanceLeaveDashboardComponent;
  let fixture: ComponentFixture<FinanceLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
