import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBorrowerDashboardComponent } from './request-borrower-dashboard.component';

describe('RequestBorrowerDashboardComponent', () => {
  let component: RequestBorrowerDashboardComponent;
  let fixture: ComponentFixture<RequestBorrowerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestBorrowerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBorrowerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
