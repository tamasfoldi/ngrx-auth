import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';
import { State, isLoggedIn } from '../../reducers/auth.reducer';
import * as auth from '../../actions/auth.actions';
import { LoginData } from '../../models/login-data.interface';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();

  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit() {
    this.store.select(isLoggedIn)
      .takeUntil(this.componentDestroyed$)
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/secure']);
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  handleLogin(loginData: LoginData) {
    this.store.dispatch(new auth.LoginAction(loginData));
  }
}
