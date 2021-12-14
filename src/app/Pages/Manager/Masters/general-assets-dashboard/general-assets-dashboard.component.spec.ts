import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssetsDashboardComponent } from './general-assets-dashboard.component';

describe('GeneralAssetsDashboardComponent', () => {
  let component: GeneralAssetsDashboardComponent;
  let fixture: ComponentFixture<GeneralAssetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAssetsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAssetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
