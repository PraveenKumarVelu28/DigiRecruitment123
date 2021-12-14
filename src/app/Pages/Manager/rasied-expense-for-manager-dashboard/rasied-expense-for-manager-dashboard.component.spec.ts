import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiedExpenseForManagerDashboardComponent } from './rasied-expense-for-manager-dashboard.component';

describe('RasiedExpenseForManagerDashboardComponent', () => {
  let component: RasiedExpenseForManagerDashboardComponent;
  let fixture: ComponentFixture<RasiedExpenseForManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiedExpenseForManagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasiedExpenseForManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
