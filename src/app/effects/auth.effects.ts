/* tslint:disable:member-ordering */
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { AuthDataStoreService } from 'app/services/auth-data-store.service';
import * as auth from '../actions/auth.actions';
import { AuthData } from '../models/auth-data.interface';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authDataStoreService: AuthDataStoreService
  ) { }

  @Effect() onLogin$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN)
    .map(toPayload)
    .switchMap(loginData => this.authService.login(loginData)
      .map(authData => new auth.LoginSuccessAction(authData))
      .catch(error => of(new auth.LoginFailAction(error))));

  @Effect() onLoginSuccess$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .map<auth.LoginSuccessAction, AuthData>(toPayload)
    .do(authData => this.authDataStoreService.data = authData)
    .map(authData => new auth.GetUserInfoAction(authData));

  @Effect() onRegister$: Observable<Action> = this.actions$
    .ofType(auth.REGISTER)
    .map(action => action.payload)
    .switchMap(regData => this.authService.register(regData)
      .map(() => new auth.RegisterSuccessAction())
      .catch(error => of(new auth.RegisterFailAction(error))));

  @Effect() onLogout$ = this.actions$
    .ofType(auth.LOGOUT)
    .switchMap(() => this.authService.logout()
      .map(() => new auth.LogoutSuccessAction())
      .catch(error => of(new auth.LogoutFailAction(error))));

  @Effect({ dispatch: false }) onLogoutSuccess$ = this.actions$
    .ofType(auth.LOGOUT_SUCCESS)
    .do(() => this.authDataStoreService.delete());

  @Effect() onGetUserInfo$: Observable<Action> = this.actions$
    .ofType(auth.GET_USER_INFO)
    .map<auth.GetUserInfoAction, AuthData>(toPayload)
    .switchMap(authData => this.authService.getUserInfo(authData.access_token)
      .map(userInfo => new auth.GetUserInfoSuccessAction(userInfo))
      .catch(error => of(new auth.GetUserInfoFailAction(error))));
}
