import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTaskByCEOComponent } from './assigned-task-by-ceo.component';

describe('AssignedTaskByCEOComponent', () => {
  let component: AssignedTaskByCEOComponent;
  let fixture: ComponentFixture<AssignedTaskByCEOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTaskByCEOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskByCEOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
