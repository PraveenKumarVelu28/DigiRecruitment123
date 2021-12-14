import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTaskDashboardComponent } from './assigned-task-dashboard.component';

describe('AssignedTaskDashboardComponent', () => {
  let component: AssignedTaskDashboardComponent;
  let fixture: ComponentFixture<AssignedTaskDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTaskDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
