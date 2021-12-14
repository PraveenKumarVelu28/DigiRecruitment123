import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeekramappingComponent } from './employeekramapping.component';

describe('EmployeekramappingComponent', () => {
  let component: EmployeekramappingComponent;
  let fixture: ComponentFixture<EmployeekramappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeekramappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeekramappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
