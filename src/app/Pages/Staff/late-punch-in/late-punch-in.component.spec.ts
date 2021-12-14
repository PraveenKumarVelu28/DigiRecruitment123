import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePunchInComponent } from './late-punch-in.component';

describe('LatePunchInComponent', () => {
  let component: LatePunchInComponent;
  let fixture: ComponentFixture<LatePunchInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatePunchInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePunchInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
