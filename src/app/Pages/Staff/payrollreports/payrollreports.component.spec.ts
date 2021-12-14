import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollreportsComponent } from './payrollreports.component';

describe('PayrollreportsComponent', () => {
  let component: PayrollreportsComponent;
  let fixture: ComponentFixture<PayrollreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
