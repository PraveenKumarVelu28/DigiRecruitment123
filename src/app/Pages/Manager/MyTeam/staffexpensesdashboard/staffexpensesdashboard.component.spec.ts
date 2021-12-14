import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffexpensesdashboardComponent } from './staffexpensesdashboard.component';

describe('StaffexpensesdashboardComponent', () => {
  let component: StaffexpensesdashboardComponent;
  let fixture: ComponentFixture<StaffexpensesdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffexpensesdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffexpensesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
