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
import { Action } from '@ngrx/store';
import { AuthService } from '../services';
import * as login from '../actions/login.actions';
import { User } from '../models';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  @Effect() auth$: Observable<Action> = this.actions$
    .ofType(login.ActionTypes.AUTH)
    .startWith(new login.AuthAction(localStorage.getItem('id_token') || null))
    .map(action => action.payload)
    .switchMap(token => this.authService.auth(token)
      .map(userData => new login.AuthSuccessAction(userData))
      .catch((error) => {
        localStorage.removeItem('id_token');
        return Observable.of(new login.AuthFailAction(error));
      })
    );

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(login.ActionTypes.LOGIN)
    .map(action => action.payload)
    .switchMap(user => this.authService.login(user.username, user.password)
      .map(auth => {
        localStorage.setItem('id_token', (<any>auth).id_token);
        return new login.LoginSuccessAction(auth);
      })
      .catch((error) => Observable.of(new login.LoginFailAction(error)))
    );

  @Effect() logout$: Observable<Action> = this.actions$
    .ofType(login.ActionTypes.LOGOUT)
    .switchMap(() => Observable.of(localStorage.removeItem('id_token'))
      .map(() => new login.LogoutSuccessAction())
    );
}
