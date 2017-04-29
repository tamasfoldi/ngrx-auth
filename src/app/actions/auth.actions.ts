import { Action } from '@ngrx/store';
import { LoginData } from '../models/login-data.interface';
import { ApiError } from '../models/api-error.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';
import { UserInfo } from '../models/user-info.interface';

export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login Success';
export const LOGIN_FAIL = '[AUTH] Login Fail';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register Success';
export const REGISTER_FAIL = '[AUTH] Register Fail';
export const AUTH = '[AUTH] Auth';
export const AUTH_SUCCESS = '[AUTH] Auth Success';
export const AUTH_FAIL = '[AUTH] Auth Fail';
export const LOGOUT = '[AUTH] Logout';
export const LOGOUT_SUCCESS = '[AUTH] Logout Success';
export const LOGOUT_FAIL = '[AUTH] Logout Fail';


export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginData) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: AuthData) { }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: ApiError) { }
}

export class RegisterAction implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegisterData) { }
}

export class RegisterSuccessAction implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor() { }
}

export class RegisterFailAction implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload: ApiError) { }
}

export class AuthAction implements Action {
  readonly type = AUTH;

  constructor(public payload: AuthData) { }
}

export class AuthSuccessAction implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: UserInfo) { }
}

export class AuthFailAction implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: ApiError) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() { }
}


export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | AuthAction
  | AuthSuccessAction
  | AuthFailAction
  | LogoutAction;
