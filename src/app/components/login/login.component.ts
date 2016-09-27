import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, getLoggedInUser } from '../../reducers';
import { LoginActions } from '../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private loginActions: LoginActions,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.loginActions.login(usr));
    this.user = new User();
  }

}
