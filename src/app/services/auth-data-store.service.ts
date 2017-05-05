import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthData } from '../models/auth-data.interface';
import { AUTH_DATA_STORE_CONFIG } from './tokens';

export interface AuthDataStoreConfig {
  ID_TOKEN_NAME: string;
  ACCESS_TOKEN_NAME: string;
}

export const DEFAUL_AUTH_DATA_STORE_CONFIG: AuthDataStoreConfig = {
  ID_TOKEN_NAME: 'token',
  ACCESS_TOKEN_NAME: 'access_token'
};

@Injectable()
export class AuthDataStoreService {

  constructor( @Inject(AUTH_DATA_STORE_CONFIG) private config: AuthDataStoreConfig) { }

  get data(): AuthData {
    return localStorage.getItem(this.config.ID_TOKEN_NAME) !== 'null' &&
      localStorage.getItem(this.config.ACCESS_TOKEN_NAME) !== 'null' ?
      {
        id_token: localStorage.getItem(this.config.ID_TOKEN_NAME),
        access_token: localStorage.getItem(this.config.ACCESS_TOKEN_NAME)
      } : null;
  }

  set data(data: AuthData) {
    localStorage.setItem(this.config.ID_TOKEN_NAME, data.id_token);
    localStorage.setItem(this.config.ACCESS_TOKEN_NAME, data.access_token);
  }

  delete(): void {
    localStorage.removeItem(this.config.ID_TOKEN_NAME);
    localStorage.removeItem(this.config.ACCESS_TOKEN_NAME);
  }
}

export const AUTH_DATA_STORE_PROVIDERS = [
  { provide: AUTH_DATA_STORE_CONFIG, useValue: DEFAUL_AUTH_DATA_STORE_CONFIG },
  AuthDataStoreService
];

