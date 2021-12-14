import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssetsForAdminComponent } from './all-assets-for-admin.component';

describe('AllAssetsForAdminComponent', () => {
  let component: AllAssetsForAdminComponent;
  let fixture: ComponentFixture<AllAssetsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAssetsForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAssetsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
