import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorRequestsComponent } from './locator-requests.component';

describe('LocatorRequestsComponent', () => {
  let component: LocatorRequestsComponent;
  let fixture: ComponentFixture<LocatorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
