import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssetComponent } from './general-asset.component';

describe('GeneralAssetComponent', () => {
  let component: GeneralAssetComponent;
  let fixture: ComponentFixture<GeneralAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
