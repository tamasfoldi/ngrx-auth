import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, getErrorState } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import { RegisterActions } from '../../actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  serverError$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private registerActions: RegisterActions,
    private fb: FormBuilder,
    private router: Router) {
    }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.serverError$ = this.store.let(getErrorState());
  }

  register() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.registerActions.register(usr));
    this.user = new User();
  }

}
