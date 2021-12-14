import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultAreaDashboardComponent } from './key-result-area-dashboard.component';

describe('KeyResultAreaDashboardComponent', () => {
  let component: KeyResultAreaDashboardComponent;
  let fixture: ComponentFixture<KeyResultAreaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyResultAreaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyResultAreaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
