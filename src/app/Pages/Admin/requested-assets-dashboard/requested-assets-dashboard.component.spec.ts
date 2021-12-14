import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedAssetsDashboardComponent } from './requested-assets-dashboard.component';

describe('RequestedAssetsDashboardComponent', () => {
  let component: RequestedAssetsDashboardComponent;
  let fixture: ComponentFixture<RequestedAssetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedAssetsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedAssetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
