import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoingGroupChatForAdminComponent } from './joing-group-chat-for-admin.component';

describe('JoingGroupChatForAdminComponent', () => {
  let component: JoingGroupChatForAdminComponent;
  let fixture: ComponentFixture<JoingGroupChatForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoingGroupChatForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoingGroupChatForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
