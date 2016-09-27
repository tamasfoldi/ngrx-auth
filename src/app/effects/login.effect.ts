/* tslint:disable:member-ordering */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { AuthService } from '../services';
import { LoginActions } from '../actions';
import { User } from '../models';

@Injectable()
export class LoginEffects {
  constructor(
    private updates$: Actions,
    private authService: AuthService,
    private loginActions: LoginActions
  ) { }

  @Effect() login$ = this.updates$
    .ofType(LoginActions.LOGIN)
    .map<User>(action => action.payload)
    .switchMap(user => this.authService.login(user.username, user.password)
      .map(auth => this.loginActions.loginSuccess(auth))
      .catch((error) => Observable.of(this.loginActions.loginFail(error)))
    );
}
