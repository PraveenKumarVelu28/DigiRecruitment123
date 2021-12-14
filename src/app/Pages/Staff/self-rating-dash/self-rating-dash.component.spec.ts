import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRatingDashComponent } from './self-rating-dash.component';

describe('SelfRatingDashComponent', () => {
  let component: SelfRatingDashComponent;
  let fixture: ComponentFixture<SelfRatingDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfRatingDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRatingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
