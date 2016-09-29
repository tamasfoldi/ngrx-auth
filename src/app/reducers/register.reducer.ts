/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { RegisterActions } from '../actions/register.actions';
import { User } from '../models';
export interface RegisterState {
  isRegistering: boolean;
  registeringUser: User;
}
const initialState: RegisterState = {
  isRegistering: false,
  registeringUser: new User()
};

export default function (state = initialState, action: Action): RegisterState {
  switch (action.type) {

    case RegisterActions.REGISTER: {
      return Object.assign({}, state, { isRegistering: true, registeringUser: action.payload });
    }

    case RegisterActions.REGISTER_SUCCESS: {
      return Object.assign({}, state, { isRegistering: false });
    }

    case RegisterActions.REGISTER_FAIL: {
      return Object.assign({}, state, { isRegistering: false, user: new User() });
    }

    default: {
      return state;
    }
  }
}

export function isRegistering() {
  return (state$: Observable<RegisterState>) => state$
    .select(s => s.isRegistering);
};

export function getRegisteringUser() {
  return (state$: Observable<RegisterState>) => state$
    .select(s => s.registeringUser);
}
