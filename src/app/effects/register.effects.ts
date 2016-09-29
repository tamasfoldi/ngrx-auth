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
import { Store } from '@ngrx/store';
import { AppState, getRegisteringUser } from '../reducers';
import { AuthService } from '../services';
import { RegisterActions, LoginActions } from '../actions';
import { User } from '../models';

@Injectable()
export class RegisterEffects {
  constructor(
    private updates$: Actions,
    private authService: AuthService,
    private registerActions: RegisterActions,
    private loginActions: LoginActions,
    private store: Store<AppState>,
  ) { }

  @Effect() register$ = this.updates$
    .ofType(RegisterActions.REGISTER)
    .map<User>(action => action.payload)
    .switchMap(user => this.authService.register(user.username, user.password)
      .map(auth => this.registerActions.registerSuccess(auth))
      .catch((error) => Observable.of(this.registerActions.registerFail(error)))
    );

  @Effect() registerSuccess$ = this.updates$
    .ofType(RegisterActions.REGISTER_SUCCESS)
    .switchMap(() => this.store.let(getRegisteringUser())
      .map(user => this.loginActions.login(user))
    );

}
