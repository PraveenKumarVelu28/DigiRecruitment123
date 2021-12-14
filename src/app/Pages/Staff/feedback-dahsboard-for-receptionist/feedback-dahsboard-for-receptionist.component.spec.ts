import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDahsboardForReceptionistComponent } from './feedback-dahsboard-for-receptionist.component';

describe('FeedbackDahsboardForReceptionistComponent', () => {
  let component: FeedbackDahsboardForReceptionistComponent;
  let fixture: ComponentFixture<FeedbackDahsboardForReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackDahsboardForReceptionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDahsboardForReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
