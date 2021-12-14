import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver1ratingdashboardComponent } from './approver1ratingdashboard.component';

describe('Approver1ratingdashboardComponent', () => {
  let component: Approver1ratingdashboardComponent;
  let fixture: ComponentFixture<Approver1ratingdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver1ratingdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver1ratingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
