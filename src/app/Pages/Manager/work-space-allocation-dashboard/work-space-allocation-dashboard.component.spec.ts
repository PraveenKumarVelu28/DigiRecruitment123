import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceAllocationDashboardComponent } from './work-space-allocation-dashboard.component';

describe('WorkSpaceAllocationDashboardComponent', () => {
  let component: WorkSpaceAllocationDashboardComponent;
  let fixture: ComponentFixture<WorkSpaceAllocationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSpaceAllocationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceAllocationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
