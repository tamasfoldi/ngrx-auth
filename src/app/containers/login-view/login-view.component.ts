import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { State } from '../../reducers/auth.reducer';
import * as auth from '../../actions/auth.actions';
import { LoginData } from '../../models/login-data.interface';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  handleLogin(loginData: LoginData) {
    this.store.dispatch(new auth.LoginAction(loginData));
  }
}
