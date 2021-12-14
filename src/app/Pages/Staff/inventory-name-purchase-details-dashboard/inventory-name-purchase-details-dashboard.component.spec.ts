import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryNamePurchaseDetailsDashboardComponent } from './inventory-name-purchase-details-dashboard.component';

describe('InventoryNamePurchaseDetailsDashboardComponent', () => {
  let component: InventoryNamePurchaseDetailsDashboardComponent;
  let fixture: ComponentFixture<InventoryNamePurchaseDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryNamePurchaseDetailsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryNamePurchaseDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
