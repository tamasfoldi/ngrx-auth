import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, getErrorState, isLoggingIn } from '../../reducers';
import { LoginActions } from '../../actions';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  serverError$: Observable<string>;
  isLogging$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private loginActions: LoginActions,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.serverError$ = this.store.let(getErrorState());
    this.isLogging$ = this.store.let(isLoggingIn());
  }

  login() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.loginActions.login(usr));
    this.user = new User();
  }

}
