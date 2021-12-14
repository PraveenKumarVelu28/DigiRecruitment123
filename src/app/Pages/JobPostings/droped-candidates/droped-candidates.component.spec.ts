import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropedCandidatesComponent } from './droped-candidates.component';

describe('DropedCandidatesComponent', () => {
  let component: DropedCandidatesComponent;
  let fixture: ComponentFixture<DropedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
