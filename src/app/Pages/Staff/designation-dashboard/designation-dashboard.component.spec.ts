import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationDashboardComponent } from './designation-dashboard.component';

describe('DesignationDashboardComponent', () => {
  let component: DesignationDashboardComponent;
  let fixture: ComponentFixture<DesignationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
