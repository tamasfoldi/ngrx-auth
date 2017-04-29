/* tslint:disable:no-switch-case-fall-through */
import { Observable } from 'rxjs/Rx';
import * as auth from '../actions/auth.actions';
import { UserInfo } from '../models/user-info.interface';
import { AuthData } from '../models/auth-data.interface';

export interface State {
  isInProgress: boolean;
  userData: UserInfo;
  authData: AuthData;
}
const initialState: State = {
  isInProgress: false,
  userData: null,
  authData: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {

    case auth.LOGIN:
    case auth.REGISTER:
    case auth.AUTH: {
      return Object.assign({}, state, { isInProgress: true });
    }

    case auth.LOGIN_FAIL:
    case auth.REGISTER_SUCCESS:
    case auth.REGISTER_FAIL:
    case auth.AUTH_FAIL: {
      return Object.assign({}, state, { isInProgress: false });
    }

    case auth.LOGIN_SUCCESS: {
      return Object.assign({}, state, { isInProgress: false, userData: action.payload });
    }

    case auth.AUTH_SUCCESS: {
      return Object.assign({}, state, { isInProgress: false, authData: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const isInProgress = (state: State) => state.isInProgress;
export const isAuthed = (state: State) => !state.isInProgress && !!state.authData;
export const isLoggedIn = (state: State) => !state.isInProgress && !!state.userData && !!state.authData;

