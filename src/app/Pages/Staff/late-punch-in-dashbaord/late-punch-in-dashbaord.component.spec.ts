import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePunchInDashbaordComponent } from './late-punch-in-dashbaord.component';

describe('LatePunchInDashbaordComponent', () => {
  let component: LatePunchInDashbaordComponent;
  let fixture: ComponentFixture<LatePunchInDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatePunchInDashbaordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePunchInDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
