/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { RegisterActions } from '../actions/register.actions';
import { User } from '../models';

export interface RegisterState {
  isRegistering: boolean;
  user?: User;
}
const initialState: RegisterState = {
  isRegistering: false,
  user: new User()
};

export default function (state = initialState, action: Action): RegisterState {
  switch (action.type) {

    case RegisterActions.REGISTER: {
      let user: User = action.payload;

      return Object.assign({}, state, { isRegistering: true, user: user });
    }

    case RegisterActions.REGISTER_SUCCESS: {
      let registerData = action.payload;
      let user: User = Object.assign({}, state.user, { id_token: registerData.id_token, access_token: registerData.access_token });

      return Object.assign({}, state, { isRegistering: false, user: user });
    }

    case RegisterActions.REGISTER_FAIL: {
      return Object.assign({}, state, { isRegistering: false });
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
