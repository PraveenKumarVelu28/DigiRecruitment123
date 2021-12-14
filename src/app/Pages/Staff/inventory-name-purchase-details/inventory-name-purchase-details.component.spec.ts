import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryNamePurchaseDetailsComponent } from './inventory-name-purchase-details.component';

describe('InventoryNamePurchaseDetailsComponent', () => {
  let component: InventoryNamePurchaseDetailsComponent;
  let fixture: ComponentFixture<InventoryNamePurchaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryNamePurchaseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryNamePurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
