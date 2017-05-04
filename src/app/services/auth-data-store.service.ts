import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthConfigConsts } from 'angular2-jwt';
import { AuthData } from '../models/auth-data.interface';

@Injectable()
export class AuthDataStoreService {

  constructor() { }

  get data(): AuthData {
    return localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME) !== 'null' && localStorage.getItem('access_token') !== 'null' ?
      {
        id_token: localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME),
        access_token: localStorage.getItem('access_token')
      } : null;
  }

  set data(data: AuthData) {
    localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, data.id_token);
    localStorage.setItem('access_token', data.access_token);
  }

  delete(): void {
    localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    localStorage.removeItem('access_token');
  }
}

