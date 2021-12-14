import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Approver2ratingpageComponent } from './approver2ratingpage.component';

describe('Approver2ratingpageComponent', () => {
  let component: Approver2ratingpageComponent;
  let fixture: ComponentFixture<Approver2ratingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Approver2ratingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Approver2ratingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
