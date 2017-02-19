import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import loginReducer, * as fromLogin from './login.reducer';
import registerReducer, * as fromRegiser from './register.reducer';
import errorReducer, * as fromError from './error.reducer';
import routerReducer from './router.reducer';

export interface AppState {
  login: fromLogin.LoginState;
  register: fromRegiser.RegisterState;
  error: fromError.ErrorState;
  router: RouterStateSnapshot;
}

export default compose(storeLogger(), combineReducers)({
  login: loginReducer,
  register: registerReducer,
  error: errorReducer,
  router: routerReducer
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
  return (state$: Observable<AppState>) => state$
    .map(s => s.login.isLogging || s.register.isRegistering);
};

export function getRegisteringUser() {
  return compose(fromRegiser.getRegisteringUser(), getRegisterState());
};

export function getErrorState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.error);
}
