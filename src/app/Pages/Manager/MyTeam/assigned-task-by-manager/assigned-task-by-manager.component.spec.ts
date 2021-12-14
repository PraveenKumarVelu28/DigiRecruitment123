import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTaskByManagerComponent } from './assigned-task-by-manager.component';

describe('AssignedTaskByManagerComponent', () => {
  let component: AssignedTaskByManagerComponent;
  let fixture: ComponentFixture<AssignedTaskByManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTaskByManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
