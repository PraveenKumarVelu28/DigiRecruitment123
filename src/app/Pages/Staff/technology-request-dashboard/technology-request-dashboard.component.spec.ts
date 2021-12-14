import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyRequestDashboardComponent } from './technology-request-dashboard.component';

describe('TechnologyRequestDashboardComponent', () => {
  let component: TechnologyRequestDashboardComponent;
  let fixture: ComponentFixture<TechnologyRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
