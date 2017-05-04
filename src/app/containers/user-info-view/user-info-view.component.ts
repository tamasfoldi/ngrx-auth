import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { State, getUserInfo } from '../../reducers/auth.reducer';
import { UserInfo } from '../../models/user-info.interface';
import * as auth from '../../actions/auth.actions';

@Component({
  selector: 'app-user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent implements OnInit {
  userInfo$: Observable<UserInfo>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo);
  }

  handleLogout() {
    this.store.dispatch(new auth.LogoutAction());
  }

}
