import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTaskForTlDashboardComponent } from './completed-task-for-tl-dashboard.component';

describe('CompletedTaskForTlDashboardComponent', () => {
  let component: CompletedTaskForTlDashboardComponent;
  let fixture: ComponentFixture<CompletedTaskForTlDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTaskForTlDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTaskForTlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
