import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestForManagerComponent } from './travel-request-for-manager.component';

describe('TravelRequestForManagerComponent', () => {
  let component: TravelRequestForManagerComponent;
  let fixture: ComponentFixture<TravelRequestForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelRequestForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelRequestForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
