import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovedExpensesDashboardComponent } from './un-approved-expenses-dashboard.component';

describe('UnApprovedExpensesDashboardComponent', () => {
  let component: UnApprovedExpensesDashboardComponent;
  let fixture: ComponentFixture<UnApprovedExpensesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnApprovedExpensesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnApprovedExpensesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
