import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTypeDashboardComponent } from './master-type-dashboard.component';

describe('MasterTypeDashboardComponent', () => {
  let component: MasterTypeDashboardComponent;
  let fixture: ComponentFixture<MasterTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
