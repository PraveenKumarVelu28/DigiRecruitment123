import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemDashboardComponent } from './inventory-item-dashboard.component';

describe('InventoryItemDashboardComponent', () => {
  let component: InventoryItemDashboardComponent;
  let fixture: ComponentFixture<InventoryItemDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
