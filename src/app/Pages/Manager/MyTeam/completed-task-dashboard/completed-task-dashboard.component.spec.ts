import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTaskDashboardComponent } from './completed-task-dashboard.component';

describe('CompletedTaskDashboardComponent', () => {
  let component: CompletedTaskDashboardComponent;
  let fixture: ComponentFixture<CompletedTaskDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTaskDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
