import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProjectMappingComponent } from './staff-project-mapping.component';

describe('StaffProjectMappingComponent', () => {
  let component: StaffProjectMappingComponent;
  let fixture: ComponentFixture<StaffProjectMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProjectMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
