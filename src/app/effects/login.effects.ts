/* tslint:disable:member-ordering */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../services';
import { LoginActions } from '../actions';
import { User } from '../models';

@Injectable()
export class LoginEffects {
  constructor(
    private updates$: Actions,
    private authService: AuthService,
    private loginActions: LoginActions
  ) { }

  @Effect() loadUserOnInit$ = Observable.of(localStorage.getItem('id_token'))
    .filter(token => tokenNotExpired())
    .map(token => this.loginActions.auth(token));


  @Effect() auth$ = this.updates$
    .ofType(LoginActions.AUTH)
    .map<string>(action => action.payload)
    .switchMap(token => this.authService.auth(token)
      .map(userData => this.loginActions.authSuccess(userData))
      .catch((error) => {
        localStorage.removeItem('id_token');
        return Observable.of(this.loginActions.authFail(error));
      })
    );

  @Effect() login$ = this.updates$
    .ofType(LoginActions.LOGIN)
    .map<User>(action => action.payload)
    .switchMap(user => this.authService.login(user.username, user.password)
      .map(auth => {
        localStorage.setItem('id_token', (<any>auth).id_token);
        return this.loginActions.loginSuccess(auth);
      })
      .catch((error) => Observable.of(this.loginActions.loginFail(error)))
    );

  @Effect() logout$ = this.updates$
    .ofType(LoginActions.LOGOUT)
    .switchMap(() => Observable.of(localStorage.removeItem('id_token'))
      .map(() => this.loginActions.logoutSuccess())
    );
}
