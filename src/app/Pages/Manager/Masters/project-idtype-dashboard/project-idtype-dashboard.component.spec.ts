import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIDTypeDashboardComponent } from './project-idtype-dashboard.component';

describe('ProjectIDTypeDashboardComponent', () => {
  let component: ProjectIDTypeDashboardComponent;
  let fixture: ComponentFixture<ProjectIDTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectIDTypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIDTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
