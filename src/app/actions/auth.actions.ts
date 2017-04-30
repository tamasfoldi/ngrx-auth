import { Action } from '@ngrx/store';
import { LoginData } from '../models/login-data.interface';
import { ApiError } from '../models/api-error.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';
import { UserInfo } from '../models/user-info.interface';
import { RegisterResponse } from '../models/register-response.interface';

export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login Success';
export const LOGIN_FAIL = '[AUTH] Login Fail';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register Success';
export const REGISTER_FAIL = '[AUTH] Register Fail';
export const LOGOUT = '[AUTH] Logout';
export const LOGOUT_SUCCESS = '[AUTH] Logout Success';
export const LOGOUT_FAIL = '[AUTH] Logout Fail';
export const GET_USER_INFO = '[AUTH] Get User Info';
export const GET_USER_INFO_SUCCESS = '[AUTH] Get User Info Success';
export const GET_USER_INFO_FAIL = '[AUTH] Get User Info Fail';


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

  constructor(public payload: RegisterResponse) { }
}

export class RegisterFailAction implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload: ApiError) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() { }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor() { }
}

export class LogoutFailAction implements Action {
  readonly type = LOGOUT_FAIL;

  constructor(public payload: ApiError) { }
}

export class GetUserInfoAction implements Action {
  readonly type = GET_USER_INFO;

  constructor(public payload: AuthData) { }
}

export class GetUserInfoSuccessAction implements Action {
  readonly type = GET_USER_INFO_SUCCESS;

  constructor(public payload: UserInfo) { }
}

export class GetUserInfoFailAction implements Action {
  readonly type = GET_USER_INFO_FAIL;

  constructor(public payload: ApiError) { }
}


export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailAction
  | GetUserInfoAction
  | GetUserInfoSuccessAction
  | GetUserInfoFailAction;
