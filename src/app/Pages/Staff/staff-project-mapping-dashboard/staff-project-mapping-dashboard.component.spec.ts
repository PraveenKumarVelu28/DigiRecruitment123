import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProjectMappingDashboardComponent } from './staff-project-mapping-dashboard.component';

describe('StaffProjectMappingDashboardComponent', () => {
  let component: StaffProjectMappingDashboardComponent;
  let fixture: ComponentFixture<StaffProjectMappingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProjectMappingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProjectMappingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
