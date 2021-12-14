import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingEventsDashboardForHRComponent } from './up-coming-events-dashboard-for-hr.component';

describe('UpComingEventsDashboardForHRComponent', () => {
  let component: UpComingEventsDashboardForHRComponent;
  let fixture: ComponentFixture<UpComingEventsDashboardForHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingEventsDashboardForHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingEventsDashboardForHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
