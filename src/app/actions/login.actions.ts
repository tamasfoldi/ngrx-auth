import { Action } from '@ngrx/store';
import { User } from '../models';

import { type } from '../util';

export const ActionTypes = {
  LOGIN: type('[LOGIN] Login'),
  LOGIN_SUCCESS: type('[LOGIN] Login Success'),
  LOGIN_FAIL: type('[LOGIN] Login Fail'),

  AUTH: type('[LOGIN] Auth'),
  AUTH_SUCCESS: type('[LOGIN] Auth Success'),
  AUTH_FAIL: type('[LOGIN] Auth Fail'),

  LOGOUT: type('[LOGIN] Logout'),
  LOGOUT_SUCCESS: type('[LOGIN] Logout Success'),
  LOGOUT_FAIL: type('[LOGIN] Logout Fail')
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  payload: User;

  constructor(user: User) {
    this.payload = user;
  }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  payload: any;

  constructor(loginData: any) {
    this.payload = loginData;
  }
}

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class AuthAction implements Action {
  type = ActionTypes.AUTH;
  payload: string;

  constructor(id_token: string) {
    this.payload = id_token;
  }
}

export class AuthSuccessAction implements Action {
  type = ActionTypes.AUTH_SUCCESS;
  payload: any;

  constructor(userData: any) {
    this.payload = userData;
  }
}

export class AuthFailAction implements Action {
  type = ActionTypes.AUTH_FAIL;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor() { }
}

export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;

  constructor() { }
}

export class LogoutFailAction implements Action {
  type = ActionTypes.LOGOUT_FAIL;

  constructor() { }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | AuthAction
  | AuthSuccessAction
  | AuthFailAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailAction;
