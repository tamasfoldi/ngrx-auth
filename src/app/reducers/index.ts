import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import loginReducer, * as fromLogin from './login.reducer';
import registerReducer, * as fromRegiser from './register.reducer';

export interface AppState {
  login: fromLogin.LoginState;
  register: fromRegiser.RegisterState;
}

export default compose(storeFreeze, storeLogger(), combineReducers)({
  login: loginReducer,
  register: registerReducer
});

export function getLoginState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.login);
}

export function isLoggedIn() {
  return compose(fromLogin.isLoggedIn(), getLoginState());
};

export function isLoggingIn() {
  return compose(fromLogin.isLoggingIn(), getLoginState());
};

export function getUser() {
  return compose(fromLogin.getUser(), getLoginState());
}

export function getLoggedInUser() {
  return compose(fromLogin.getLoggedInUser(), getLoginState());
}

export function getRegisterState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.register);
}

export function isRegistering() {
  return compose(fromRegiser.isRegistering(), getRegisterState());
};
