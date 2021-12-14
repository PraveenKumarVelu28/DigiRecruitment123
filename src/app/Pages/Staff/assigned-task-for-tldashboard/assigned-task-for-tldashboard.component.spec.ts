import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTaskForTLDashboardComponent } from './assigned-task-for-tldashboard.component';

describe('AssignedTaskForTLDashboardComponent', () => {
  let component: AssignedTaskForTLDashboardComponent;
  let fixture: ComponentFixture<AssignedTaskForTLDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTaskForTLDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskForTLDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
