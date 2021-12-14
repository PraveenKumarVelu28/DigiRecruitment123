import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedEventsDashboardForAdminComponent } from './completed-events-dashboard-for-admin.component';

describe('CompletedEventsDashboardForAdminComponent', () => {
  let component: CompletedEventsDashboardForAdminComponent;
  let fixture: ComponentFixture<CompletedEventsDashboardForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedEventsDashboardForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedEventsDashboardForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
