import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired, AuthConfigConsts } from 'angular2-jwt';
import { State } from './reducers/auth.reducer';
import * as auth from './actions/auth.actions';
import { AuthDataStoreService } from 'app/services/auth-data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>, private authDataStoreService: AuthDataStoreService) { }

  ngOnInit() {
    if (!!this.authDataStoreService.data && tokenNotExpired()) {
      this.store.dispatch(new auth.LoginSuccessAction(this.authDataStoreService.data));
    }
  }
}
