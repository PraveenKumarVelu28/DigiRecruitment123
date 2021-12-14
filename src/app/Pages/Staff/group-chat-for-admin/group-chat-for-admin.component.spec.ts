import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatForAdminComponent } from './group-chat-for-admin.component';

describe('GroupChatForAdminComponent', () => {
  let component: GroupChatForAdminComponent;
  let fixture: ComponentFixture<GroupChatForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupChatForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
