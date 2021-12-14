import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssetTypeIDComponent } from './general-asset-type-id.component';

describe('GeneralAssetTypeIDComponent', () => {
  let component: GeneralAssetTypeIDComponent;
  let fixture: ComponentFixture<GeneralAssetTypeIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAssetTypeIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAssetTypeIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
