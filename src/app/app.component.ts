import { Component } from '@angular/core';
import { User } from './models';
import { Store } from '@ngrx/store';
import { AppState, isLoggedIn, getLoggedInUser } from './reducers';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user: User = new User();
  isLoggedIn$;
  loggedInUser$;
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
