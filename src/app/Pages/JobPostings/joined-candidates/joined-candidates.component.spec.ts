import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedCandidatesComponent } from './joined-candidates.component';

describe('JoinedCandidatesComponent', () => {
  let component: JoinedCandidatesComponent;
  let fixture: ComponentFixture<JoinedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
