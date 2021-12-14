import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocatorRequestComponent } from './add-locator-request.component';

describe('AddLocatorRequestComponent', () => {
  let component: AddLocatorRequestComponent;
  let fixture: ComponentFixture<AddLocatorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocatorRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocatorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
