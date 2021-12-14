import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMasterDashboardComponent } from './department-master-dashboard.component';

describe('DepartmentMasterDashboardComponent', () => {
  let component: DepartmentMasterDashboardComponent;
  let fixture: ComponentFixture<DepartmentMasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentMasterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentMasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
