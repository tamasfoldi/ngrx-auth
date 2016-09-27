/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../models';

@Injectable()
export class RegisterActions {
  static REGISTER = '[REGISTER] Register';
  register(user: User): Action {
    return {
      type: RegisterActions.REGISTER,
      payload: user
    };
  }

  static REGISTER_SUCCESS = '[REGISTER] Register Success';
  registerSuccess(registerData: any): Action {
    return {
      type: RegisterActions.REGISTER_SUCCESS,
      payload: registerData
    };
  }

  static REGISTER_FAIL = '[REGISTER] Register Fail';
  registerFail(message: string): Action {
    return {
      type: RegisterActions.REGISTER_FAIL,
      payload: message
    };
  }
}
