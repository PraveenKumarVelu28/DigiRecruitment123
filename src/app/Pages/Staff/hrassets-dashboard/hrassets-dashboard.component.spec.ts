import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRAssetsDashboardComponent } from './hrassets-dashboard.component';

describe('HRAssetsDashboardComponent', () => {
  let component: HRAssetsDashboardComponent;
  let fixture: ComponentFixture<HRAssetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRAssetsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRAssetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
