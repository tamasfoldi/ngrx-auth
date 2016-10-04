import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, getErrorState, getLoginState } from '../../reducers';
import { LoginActions } from '../../actions';
import { Router } from '@angular/router';
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

  constructor(
    private store: Store<AppState>,
    private loginActions: LoginActions,
    private router: Router,
    private fb: FormBuilder) {
    // this.store.let(getLoginState())
    //   .filter(state => state.isLoggedIn)
    //   .subscribe(() => this.router.navigate(['/secret']));
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.serverError$ = this.store.let(getErrorState());
  }

  login() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.loginActions.login(usr));
    this.user = new User();
  }

}
