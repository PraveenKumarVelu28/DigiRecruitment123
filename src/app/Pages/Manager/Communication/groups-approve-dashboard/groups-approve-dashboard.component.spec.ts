import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsApproveDashboardComponent } from './groups-approve-dashboard.component';

describe('GroupsApproveDashboardComponent', () => {
  let component: GroupsApproveDashboardComponent;
  let fixture: ComponentFixture<GroupsApproveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsApproveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsApproveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
