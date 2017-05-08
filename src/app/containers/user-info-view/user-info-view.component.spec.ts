import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoViewComponent } from './user-info-view.component';

describe('UserInfoViewComponent', () => {
  let component: UserInfoViewComponent;
  let fixture: ComponentFixture<UserInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
