import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, getErrorState, isRegistering } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import * as register from '../../actions/register.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  serverError$: Observable<string>;
  isRegistering$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.serverError$ = this.store.let(getErrorState());
    this.isRegistering$ = this.store.let(isRegistering());
  }

  register() {
    const usr = Object.assign({}, this.user);
    this.store.dispatch(new register.RegisterAction(usr));
    this.user = new User();
  }

}
