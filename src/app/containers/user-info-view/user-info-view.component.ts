import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs/Rx';
import { State, getUserInfo } from '../../reducers/auth.reducer';
import { UserInfo } from '../../models/user-info.interface';
import * as auth from '../../actions/auth.actions';

@Component({
  selector: 'app-user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent implements OnInit, OnDestroy {
  userInfo$: Observable<UserInfo>;
  componentDestroyed$ = new Subject();

  constructor(private store: Store<State>, private actions$: Actions, private router: Router) { }

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo);
    this.actions$
      .ofType(auth.LOGOUT_SUCCESS)
      .takeUntil(this.componentDestroyed$)
      .subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  handleLogout() {
    this.store.dispatch(new auth.LogoutAction());
  }

}
