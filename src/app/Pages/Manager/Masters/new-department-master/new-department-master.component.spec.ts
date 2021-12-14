import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartmentMasterComponent } from './new-department-master.component';

describe('NewDepartmentMasterComponent', () => {
  let component: NewDepartmentMasterComponent;
  let fixture: ComponentFixture<NewDepartmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDepartmentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
