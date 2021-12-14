import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRatingPageComponent } from './self-rating-page.component';

describe('SelfRatingPageComponent', () => {
  let component: SelfRatingPageComponent;
  let fixture: ComponentFixture<SelfRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfRatingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
