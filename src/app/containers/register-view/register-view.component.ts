import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { State } from '../../reducers/auth.reducer';
import * as auth from '../../actions/auth.actions';
import { RegisterData } from '../../models/register-data.interface';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  handleRegister(regData: RegisterData) {
    this.store.dispatch(new auth.RegisterAction(regData));
  }

}
