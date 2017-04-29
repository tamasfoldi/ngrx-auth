/* tslint:disable:no-switch-case-fall-through */
import { Observable } from 'rxjs/Rx';
import * as auth from '../actions/auth.actions';
import { AuthData } from '../models/auth-data.interface';

export interface State {
  isInProgress: boolean;
  authData: AuthData;
}
const initialState: State = {
  isInProgress: false,
  authData: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {

    case auth.LOGIN:
    case auth.REGISTER: {
      return Object.assign({}, state, { isInProgress: true });
    }

    case auth.LOGIN_FAIL:
    case auth.REGISTER_SUCCESS:
    case auth.REGISTER_FAIL: {
      return Object.assign({}, state, { isInProgress: false });
    }

    case auth.LOGIN_SUCCESS: {
      return Object.assign({}, state, { isInProgress: false, userData: action.payload });
    }

    case auth.LOGOUT: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export const isInProgress = (state: State) => state.isInProgress;
export const isAuthed = (state: State) => !state.isInProgress && !!state.authData;
