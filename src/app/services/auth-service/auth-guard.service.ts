import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState, getLoginState } from '../../reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class SecretGuard implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.let(getLoginState())
      .debounceTime(500)
      .take(1)
      .map(state => state.isLoggedIn ? true : this.handleAuthFail());
  }

  handleAuthFail(): boolean {
    this.router.navigate(['/auth']);
    return false;
  }
}
