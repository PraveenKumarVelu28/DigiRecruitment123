import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetsByHRComponent } from './add-assets-by-hr.component';

describe('AddAssetsByHRComponent', () => {
  let component: AddAssetsByHRComponent;
  let fixture: ComponentFixture<AddAssetsByHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetsByHRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetsByHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
