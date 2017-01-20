import { Action } from '@ngrx/store';
import { User } from '../models';

import { type } from '../util';

export const ActionTypes = {
  REGISTER: type('[REGISTER] Register'),
  REGISTER_SUCCESS: type('[REGISTER] Register Success'),
  REGISTER_FAIL: type('[REGISTER] Register Fail'),
};

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;
  payload: User;

  constructor(user: User) {
    this.payload = user;
  }
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;
  payload: any;

  constructor(registerData: any) {
    this.payload = registerData;
  }
}

export class RegisterFailAction implements Action {
  type = ActionTypes.REGISTER_FAIL;
  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export type Actions
  = RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction;

