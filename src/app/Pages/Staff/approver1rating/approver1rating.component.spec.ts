import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver1ratingComponent } from './approver1rating.component';

describe('Approver1ratingComponent', () => {
  let component: Approver1ratingComponent;
  let fixture: ComponentFixture<Approver1ratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver1ratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver1ratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
