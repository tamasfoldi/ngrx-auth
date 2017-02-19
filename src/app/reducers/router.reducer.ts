/* tslint:disable:no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as router from '../router-store';
import { User } from '../models';

const initialState: RouterStateSnapshot = {
  root: null,
  url: '',
  toString: () => ''
};

export default function (state = initialState, action: Action): RouterStateSnapshot {
  switch (action.type) {
    case router.ActionTypes.ERROR:
    case router.ActionTypes.CANCEL:
    case router.ActionTypes.NAVIGATION: {
      return action.payload.routerState;
    }
    default: {
      return state;
    }
  }
}

