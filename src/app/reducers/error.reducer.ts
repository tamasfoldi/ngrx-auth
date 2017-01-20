/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import * as login from '../actions/login.actions';
import * as register from '../actions/register.actions';

export type ErrorState = string;
const initialState: ErrorState = '';

export default function (state = initialState, action: Action): ErrorState {
  switch (action.type) {

    case register.ActionTypes.REGISTER_FAIL: {
      const error_message = action.payload.description ? action.payload.description : action.payload.error;
      return error_message;
    }

    case login.ActionTypes.LOGIN_FAIL: {
      const error_message = action.payload.error_description ? action.payload.error_description : action.payload.error;
      return error_message;
    }

    case register.ActionTypes.REGISTER_SUCCESS:
    case login.ActionTypes.LOGIN_SUCCESS: {
      return '';
    }

    default: {
      return state;
    }
  }
}
