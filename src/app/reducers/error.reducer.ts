/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { LoginActions } from '../actions/login.actions';
import { RegisterActions } from '../actions/register.actions';

export type ErrorState = string;
const initialState: ErrorState = '';

export default function (state = initialState, action: Action): ErrorState {
  switch (action.type) {

    case RegisterActions.REGISTER_FAIL: {
      const error_message = action.payload.description ? action.payload.description : action.payload.error;
      return error_message;
    }

    case LoginActions.LOGIN_FAIL: {
      const error_message = action.payload.error_description ? action.payload.error_description : action.payload.error;
      return error_message;
    }

    case RegisterActions.REGISTER_SUCCESS:
    case LoginActions.LOGIN_SUCCESS: {
      return '';
    }

    default: {
      return state;
    }
  }
}
