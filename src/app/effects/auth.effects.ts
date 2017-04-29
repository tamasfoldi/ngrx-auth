/* tslint:disable:member-ordering */
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import * as auth from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
  @Effect() login$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN)
    .map(action => action.payload)
    .switchMap(loginData => this.authService.login(loginData)
      .map(userData => new auth.LoginSuccessAction(userData))
      .catch(error => of(new auth.LoginFailAction(error)))
    );
}
