import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMappingdashComponent } from './menu-mappingdash.component';

describe('MenuMappingdashComponent', () => {
  let component: MenuMappingdashComponent;
  let fixture: ComponentFixture<MenuMappingdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMappingdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMappingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
