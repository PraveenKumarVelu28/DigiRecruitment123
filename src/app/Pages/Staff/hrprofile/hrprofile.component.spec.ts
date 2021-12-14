import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRProfileComponent } from './hrprofile.component';

describe('HRProfileComponent', () => {
  let component: HRProfileComponent;
  let fixture: ComponentFixture<HRProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
