import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AUTH_OPTIONS } from './tokens';
import { LoginData } from '../models/login-data.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';
import { UserInfo } from '../models/user-info.interface';

export interface AuthClientOptions {
  baseUrl: string;
  clientID: string;
  connection: string;
  scope: string;
}

export const DEFAULT_AUTH_OPTIONS: AuthClientOptions = {
  baseUrl: 'https://tamasfoldi.eu.auth0.com',
  clientID: 'e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF',
  connection: 'Username-Password-Authentication',
  scope: 'openid'
};

@Injectable()
export class AuthService {

  constructor(private http: Http, @Inject(AUTH_OPTIONS) private clientOptions: AuthClientOptions) { }

  login(loginData: LoginData): Observable<AuthData> {
    const body = {
      client_id: this.clientOptions.clientID,
      username: loginData.email,
      password: loginData.password,
      connection: this.clientOptions.connection,
      scope: this.clientOptions.scope
    };

    return this.http.post(`${this.clientOptions.baseUrl}/oauth/ro`, body)
      .map(rsp => rsp.json());
  };

  register(regData: RegisterData): Observable<void> {
    const body = {
      client_id: this.clientOptions.clientID,
      username: regData.email,
      password: regData.password,
      connection: this.clientOptions.connection
    };

    return this.http.post(`${this.clientOptions.baseUrl}/dbconnections/signup`, regData)
      .map(rsp => rsp.json());
  };

  logout(): Observable<void> {
    return this.http.get(`${this.clientOptions.baseUrl}/v2/logout?client_id=${this.clientOptions.clientID}`)
      .map(rsp => rsp.json());
  }

  getUserInfo(access_token: string): Observable<UserInfo> {
    return this.http.get(`${this.clientOptions.baseUrl}/userinfo`)
      .map(rsp => rsp.json());
  }
}

export const AUTH_PROVIDERS = [
  { provide: AUTH_OPTIONS, useValue: DEFAULT_AUTH_OPTIONS },
  AuthService
];
