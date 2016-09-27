/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from '../actions/login.actions';
import { User } from '../models';

export interface LoginState {
  isFetching: boolean;
  isLoggedIn: boolean;
  user?: User;
}
const initialState: LoginState = {
  isFetching: false,
  isLoggedIn: false,
  user: new User()
};

export default function (state = initialState, action: Action): LoginState {
  switch (action.type) {
    case LoginActions.LOGIN: {
      let user: User = action.payload;

      return Object.assign({}, state, { isFetching: true, isLoggedIn: false, user: user });
    }
    case LoginActions.LOGIN_SUCCESS: {
      let loginData = action.payload;
      let user: User = Object.assign({}, state.user, { id_token: loginData.id_token, access_token: loginData.access_token });

      return Object.assign({}, state, { isFetching: false, isLoggedIn: true, user: user });
    }
    case LoginActions.LOGIN_FAIL: {
      return Object.assign({}, state, { isFetching: false, isLoggedIn: false });
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

export function getUser() {
  return (state$: Observable<LoginState>) => state$
    .select(s => s.user);
}

export function getLoggedInUser() {
  return (state$: Observable<LoginState>) => state$
    .map(s => s.isLoggedIn ? s.user : null);
}
