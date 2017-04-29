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
      .catch(error => of(new auth.LoginFailAction(error)))
    );

  @Effect({ dispatch: false }) onLoginSuccess$: Observable<AuthData> = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .map<auth.LoginSuccessAction, AuthData>(toPayload)
    .do(authData => this.authDataStoreService.data = authData.id_token);

  @Effect() onRegister$: Observable<Action> = this.actions$
    .ofType(auth.REGISTER)
    .map(action => action.payload)
    .switchMap(regData => this.authService.register(regData)
      .map(() => new auth.RegisterSuccessAction())
      .catch(error => of(new auth.RegisterFailAction(error)))
    );

  @Effect({ dispatch: false }) onLogout$ = this.actions$
    .ofType(auth.LOGOUT)
    .do(() => this.authDataStoreService.delete());
}