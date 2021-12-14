import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceLeaveComponent } from './finance-leave.component';

describe('FinanceLeaveComponent', () => {
  let component: FinanceLeaveComponent;
  let fixture: ComponentFixture<FinanceLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
