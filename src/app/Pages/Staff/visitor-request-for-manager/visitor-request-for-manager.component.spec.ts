import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRequestForManagerComponent } from './visitor-request-for-manager.component';

describe('VisitorRequestForManagerComponent', () => {
  let component: VisitorRequestForManagerComponent;
  let fixture: ComponentFixture<VisitorRequestForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorRequestForManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRequestForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
