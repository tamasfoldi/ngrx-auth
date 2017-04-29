import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AUTH_DATA_STORE_KEY } from './tokens';

@Injectable()
export class AuthDataStoreService {

  constructor( @Inject(AUTH_DATA_STORE_KEY) private dataKey) { }

  get data(): string {
    return localStorage.getItem(this.dataKey);
  }

  set data(data: string) {
    localStorage.setItem(this.dataKey, data);
  }

  delete(): void {
    localStorage.removeItem(this.dataKey);
  }
}

export const AUTH_DATA_STORE_PROVIDERS = [
  { provide: AUTH_DATA_STORE_KEY, useValue: 'id_token' },
  AuthDataStoreService
];
