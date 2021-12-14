import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRLeaveComponent } from './hrleave.component';

describe('HRLeaveComponent', () => {
  let component: HRLeaveComponent;
  let fixture: ComponentFixture<HRLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
