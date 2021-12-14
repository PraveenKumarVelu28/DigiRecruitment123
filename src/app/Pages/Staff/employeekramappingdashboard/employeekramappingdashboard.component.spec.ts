import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeekramappingdashboardComponent } from './employeekramappingdashboard.component';

describe('EmployeekramappingdashboardComponent', () => {
  let component: EmployeekramappingdashboardComponent;
  let fixture: ComponentFixture<EmployeekramappingdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeekramappingdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeekramappingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
