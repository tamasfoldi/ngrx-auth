/* tslint:disable:member-ordering */
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import * as auth from '../actions/auth.actions';
import { AuthData } from "app/models/auth-data.interface";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
  @Effect() onLogin$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN)
    .map(toPayload)
    .switchMap(loginData => this.authService.login(loginData)
      .map(authData => new auth.LoginSuccessAction(authData))
      .catch(error => of(new auth.LoginFailAction(error)))
    );

  @Effect() onLoginSuccess$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .map(toPayload)
    .map(authData => new auth.AuthAction(authData));

  @Effect() onRegister$: Observable<Action> = this.actions$
    .ofType(auth.REGISTER)
    .map(action => action.payload)
    .switchMap(regData => this.authService.register(regData)
      .map(() => new auth.RegisterSuccessAction())
      .catch(error => of(new auth.RegisterFailAction(error)))
    );

  @Effect() onAuth$: Observable<Action> = this.actions$
    .ofType(auth.AUTH)
    .map<auth.AuthAction, AuthData>(toPayload)
    .switchMap(authData => this.authService.auth(authData.id_token)
      .map(userInfo => new auth.AuthSuccessAction(userInfo))
      .catch(error => of(new auth.AuthFailAction(error)))
    );
}
