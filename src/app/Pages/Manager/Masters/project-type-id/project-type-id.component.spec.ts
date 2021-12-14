import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeIDComponent } from './project-type-id.component';

describe('ProjectTypeIDComponent', () => {
  let component: ProjectTypeIDComponent;
  let fixture: ComponentFixture<ProjectTypeIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
