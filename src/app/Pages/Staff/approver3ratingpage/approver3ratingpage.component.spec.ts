import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver3ratingpageComponent } from './approver3ratingpage.component';

describe('Approver3ratingpageComponent', () => {
  let component: Approver3ratingpageComponent;
  let fixture: ComponentFixture<Approver3ratingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver3ratingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver3ratingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
