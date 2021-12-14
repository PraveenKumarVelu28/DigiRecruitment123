import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListForAdminComponent } from './project-list-for-admin.component';

describe('ProjectListForAdminComponent', () => {
  let component: ProjectListForAdminComponent;
  let fixture: ComponentFixture<ProjectListForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
