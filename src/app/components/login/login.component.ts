import { Component } from '@angular/core';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, isLoggedIn, getLoggedInUser } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from '../../actions';

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
    private heroActions: LoginActions) {
      this.isLoggedIn$ = this.store.let(isLoggedIn());
      this.loggedInUser$ = this.store.let(getLoggedInUser());
  }

  login() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.heroActions.login(usr));
    this.user = new User();
  }

}
