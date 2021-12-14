import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVisitorRequestforAdminComponent } from './all-visitor-requestfor-admin.component';

describe('AllVisitorRequestforAdminComponent', () => {
  let component: AllVisitorRequestforAdminComponent;
  let fixture: ComponentFixture<AllVisitorRequestforAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVisitorRequestforAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVisitorRequestforAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
