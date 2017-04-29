import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthData } from '../models/auth-data.interface';

@Injectable()
export class AuthDataStoreService {

  constructor() { }

  get data(): AuthData {
    return localStorage.getItem('id_token') !== 'null' && localStorage.getItem('access_token') !== 'null' ?
      {
        id_token: localStorage.getItem('id_token'),
        access_token: localStorage.getItem('access_token')
      } : null;
  }

  set data(data: AuthData) {
    localStorage.setItem('id_token', data.id_token);
    localStorage.setItem('access_token', data.access_token);
  }

  delete(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
  }
}

