import { Action } from '@ngrx/store';
import { LoginData } from '../models/login-data.interface';
import { ApiError } from '../models/api-error.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';

export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login Success';
export const LOGIN_FAIL = '[AUTH] Login Fail';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register Success';
export const REGISTER_FAIL = '[AUTH] Register Fail';
export const LOGOUT = '[AUTH] Logout';

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
  | LogoutAction;