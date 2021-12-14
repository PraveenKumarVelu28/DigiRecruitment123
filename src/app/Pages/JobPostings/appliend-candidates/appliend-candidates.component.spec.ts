import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliendCandidatesComponent } from './appliend-candidates.component';

describe('AppliendCandidatesComponent', () => {
  let component: AppliendCandidatesComponent;
  let fixture: ComponentFixture<AppliendCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliendCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliendCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
