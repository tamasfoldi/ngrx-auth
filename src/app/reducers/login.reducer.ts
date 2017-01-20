/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as login from '../actions/login.actions';
import { User } from '../models';

export interface LoginState {
  isLogging: boolean;
  isLoggedIn: boolean;
  user?: User;
}
const initialState: LoginState = {
  isLogging: false,
  isLoggedIn: null,
  user: new User()
};

export default function (state = initialState, action: Action): LoginState {
  switch (action.type) {

    case login.ActionTypes.AUTH: {
      return Object.assign({}, state, { isLogging: true, isLoggedIn: false });
    }

    case login.ActionTypes.AUTH_SUCCESS: {
      const user = new User(action.payload.name);

      return Object.assign({}, state, { isLogging: false, isLoggedIn: true, user: user });
    }

    case login.ActionTypes.LOGIN: {
      const user: User = action.payload;

      return Object.assign({}, state, { isLogging: true, isLoggedIn: false, user: user });
    }

    case login.ActionTypes.LOGIN_SUCCESS: {
      const loginData = action.payload;
      const user: User = Object.assign({}, state.user, { id_token: loginData.id_token, access_token: loginData.access_token });

      return Object.assign({}, state, { isLogging: false, isLoggedIn: true, user: user });
    }

    case login.ActionTypes.AUTH_FAIL:
    case login.ActionTypes.LOGIN_FAIL: {
      return Object.assign({}, state, { isLogging: false, isLoggedIn: false });
    }

    case login.ActionTypes.LOGOUT_SUCCESS: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function isLoggedIn() {
  return (state$: Observable<LoginState>) => state$
    .select(s => s.isLoggedIn);
};

export function isLoggingIn() {
  return (state$: Observable<LoginState>) => state$
    .select(s => s.isLogging);
};

export function getUser() {
  return (state$: Observable<LoginState>) => state$
    .select(s => s.user);
}

export function getLoggedInUser() {
  return (state$: Observable<LoginState>) => state$
    .map(s => s.isLoggedIn ? s.user : null);
}
