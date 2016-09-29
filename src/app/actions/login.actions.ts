/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../models';

@Injectable()
export class LoginActions {
  static LOGIN = '[LOGIN] Login';
  login(user: User): Action {
    return {
      type: LoginActions.LOGIN,
      payload: user
    };
  }

  static LOGIN_SUCCESS = '[LOGIN] Login Success';
  loginSuccess(loginData: any): Action {
    return {
      type: LoginActions.LOGIN_SUCCESS,
      payload: loginData
    };
  }

  static LOGIN_FAIL = '[LOGIN] Login Fail';
  loginFail(message: string): Action {
    return {
      type: LoginActions.LOGIN_FAIL,
      payload: message
    };
  }

  static AUTH = '[LOGIN] Auth';
  auth(id_token: string): Action {
    return {
      type: LoginActions.AUTH,
      payload: id_token
    };
  }

  static AUTH_SUCCESS = '[LOGIN] Auth Success';
  authSuccess(userData: any): Action {
    return {
      type: LoginActions.AUTH_SUCCESS,
      payload: userData
    };
  }

  static AUTH_FAIL = '[LOGIN] Auth Fail';
  authFail(message: string): Action {
    return {
      type: LoginActions.AUTH_FAIL,
      payload: message
    };
  }
}
