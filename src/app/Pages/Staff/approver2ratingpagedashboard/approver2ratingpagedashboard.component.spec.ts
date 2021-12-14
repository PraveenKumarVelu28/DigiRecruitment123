import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver2ratingpagedashboardComponent } from './approver2ratingpagedashboard.component';

describe('Approver2ratingpagedashboardComponent', () => {
  let component: Approver2ratingpagedashboardComponent;
  let fixture: ComponentFixture<Approver2ratingpagedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver2ratingpagedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver2ratingpagedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
