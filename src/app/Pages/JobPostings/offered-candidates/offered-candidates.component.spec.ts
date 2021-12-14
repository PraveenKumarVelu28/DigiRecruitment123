import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedCandidatesComponent } from './offered-candidates.component';

describe('OfferedCandidatesComponent', () => {
  let component: OfferedCandidatesComponent;
  let fixture: ComponentFixture<OfferedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
