import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver3ratingpagedashboardComponent } from './approver3ratingpagedashboard.component';

describe('Approver3ratingpagedashboardComponent', () => {
  let component: Approver3ratingpagedashboardComponent;
  let fixture: ComponentFixture<Approver3ratingpagedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver3ratingpagedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver3ratingpagedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
