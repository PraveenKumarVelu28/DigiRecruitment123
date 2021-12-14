import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingEventsDashboardForManagerComponent } from './up-coming-events-dashboard-for-manager.component';

describe('UpComingEventsDashboardForManagerComponent', () => {
  let component: UpComingEventsDashboardForManagerComponent;
  let fixture: ComponentFixture<UpComingEventsDashboardForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingEventsDashboardForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingEventsDashboardForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
