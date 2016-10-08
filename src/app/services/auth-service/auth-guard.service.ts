import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivateChild, Route, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState, getLoginState } from '../../reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivateChild {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  canLoad(route: Route): Observable<boolean> {
    return this.guard();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.guard();
  }

  guard(): Observable<boolean> {
    return this.store.let(getLoginState())
      .filter(state => state.isLoggedIn !== null)
      .take(1)
      .map(state => state.isLoggedIn ? true : this.handleAuthFail());
  }

  handleAuthFail(): boolean {
    this.router.navigate(['/auth']);
    return false;
  }
}
