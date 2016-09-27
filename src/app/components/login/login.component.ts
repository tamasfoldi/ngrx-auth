import { Component } from '@angular/core';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, isLoggedIn, getLoggedInUser } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from '../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  isLoggedIn$: Observable<boolean>;
  loggedInUser$: Observable<User>;
  constructor(
    private store: Store<AppState>,
    private loginActions: LoginActions,
    private router: Router) {
    this.isLoggedIn$ = this.store.let(isLoggedIn());
    this.loggedInUser$ = this.store.let(getLoggedInUser());
  }

  login() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.loginActions.login(usr));
    this.user = new User();
  }

}
