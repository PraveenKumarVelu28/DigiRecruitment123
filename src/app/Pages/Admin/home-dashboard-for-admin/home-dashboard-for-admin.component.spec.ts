import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashboardForAdminComponent } from './home-dashboard-for-admin.component';

describe('HomeDashboardForAdminComponent', () => {
  let component: HomeDashboardForAdminComponent;
  let fixture: ComponentFixture<HomeDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
