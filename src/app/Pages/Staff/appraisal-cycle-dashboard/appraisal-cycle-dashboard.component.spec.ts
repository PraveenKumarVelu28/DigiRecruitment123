import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalCycleDashboardComponent } from './appraisal-cycle-dashboard.component';

describe('AppraisalCycleDashboardComponent', () => {
  let component: AppraisalCycleDashboardComponent;
  let fixture: ComponentFixture<AppraisalCycleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalCycleDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalCycleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
