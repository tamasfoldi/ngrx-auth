import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AUTH_OPTIONS } from './tokens';
import { LoginData } from '../models/login-data.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';

export interface AuthClientOptions {
  baseUrl: string;
  clientID: string;
  connection: string;
}

export const DEFAULT_AUTH_OPTIONS: AuthClientOptions = {
  baseUrl: 'https://tamasfoldi.eu.auth0.com',
  clientID: 'e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF',
  connection: 'Username-Password-Authentication'
};

@Injectable()
export class AuthService {

  constructor(private http: Http, @Inject(AUTH_OPTIONS) private clientOptions: AuthClientOptions) { }

  login(loginData: LoginData): Observable<AuthData> {
    return this.http.post('login', loginData)
      .map(rsp => rsp.json());
  };

  register(regData: RegisterData): Observable<void> {
    return this.http.post('register', regData)
      .map(rsp => rsp.json());
  };
}

export const AUTH_PROVIDERS = [
  { provide: AUTH_OPTIONS, useValue: DEFAULT_AUTH_OPTIONS },
  AuthService
];
