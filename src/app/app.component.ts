import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppState, isLoggedIn, getUser, getLoginState } from './reducers';
import * as login from './actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  isAuthed$: Observable<boolean>;
  authedUsername$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private router: Router

  ) {
    this.store.let(getLoginState())
      .filter(state => state.isLoggedIn)
      .subscribe(() => this.router.navigate(['/secret']));
  }

  ngOnInit() {
    this.isAuthed$ = this.store.let(isLoggedIn());
    this.authedUsername$ = this.store.let(getUser()).map(user => user.username);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.store.dispatch(new login.LogoutAction());
  }
}
