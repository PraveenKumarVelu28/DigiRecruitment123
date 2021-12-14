import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEOProfileComponent } from './ceoprofile.component';

describe('CEOProfileComponent', () => {
  let component: CEOProfileComponent;
  let fixture: ComponentFixture<CEOProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEOProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CEOProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
