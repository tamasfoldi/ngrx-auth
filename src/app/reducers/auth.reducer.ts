/* tslint:disable:no-switch-case-fall-through */
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import * as auth from '../actions/auth.actions';
import { AuthData } from '../models/auth-data.interface';
import { UserInfo } from 'app/models/user-info.interface';

export interface State {
  isInProgress: boolean;
  authData: AuthData;
  userInfo: UserInfo;
}
const initialState: State = {
  isInProgress: false,
  authData: null,
  userInfo: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {

    case auth.LOGIN:
    case auth.REGISTER:
    case auth.LOGOUT:
    case auth.GET_USER_INFO: {
      return Object.assign({}, state, { isInProgress: true });
    }

    case auth.LOGIN_FAIL:
    case auth.REGISTER_SUCCESS:
    case auth.REGISTER_FAIL:
    case auth.LOGOUT_FAIL:
    case auth.GET_USER_INFO_FAIL: {
      return Object.assign({}, state, { isInProgress: false });
    }

    case auth.LOGIN_SUCCESS: {
      return Object.assign({}, state, { isInProgress: false, authData: action.payload });
    }

    case auth.LOGOUT_SUCCESS: {
      return Object.assign({}, initialState);
    }

    case auth.GET_USER_INFO_SUCCESS: {
      return Object.assign({}, state, { isInProgress: false, userInfo: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const isInProgress = (state: State) => state.isInProgress;
export const isAuthed = (state: State) => !!state.authData && tokenNotExpired();
export const isLoggedIn = (state: State) => !!state.authData && !!state.userInfo && tokenNotExpired();
export const getUserInfo = (state: State) => state.userInfo;
