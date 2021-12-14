import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeaveDashboardComponent } from './manager-leave-dashboard.component';

describe('ManagerLeaveDashboardComponent', () => {
  let component: ManagerLeaveDashboardComponent;
  let fixture: ComponentFixture<ManagerLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerLeaveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
