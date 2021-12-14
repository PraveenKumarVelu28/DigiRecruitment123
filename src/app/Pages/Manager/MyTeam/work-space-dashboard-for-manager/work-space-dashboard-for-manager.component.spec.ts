import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceDashboardForManagerComponent } from './work-space-dashboard-for-manager.component';

describe('WorkSpaceDashboardForManagerComponent', () => {
  let component: WorkSpaceDashboardForManagerComponent;
  let fixture: ComponentFixture<WorkSpaceDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSpaceDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
