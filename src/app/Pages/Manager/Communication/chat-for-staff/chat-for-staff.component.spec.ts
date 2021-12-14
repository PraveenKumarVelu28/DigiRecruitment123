import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatForStaffComponent } from './chat-for-staff.component';

describe('ChatForStaffComponent', () => {
  let component: ChatForStaffComponent;
  let fixture: ComponentFixture<ChatForStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatForStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatForStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
