import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostajobdashComponent } from './postajobdash.component';

describe('PostajobdashComponent', () => {
  let component: PostajobdashComponent;
  let fixture: ComponentFixture<PostajobdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostajobdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostajobdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
