import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AUTH_OPTIONS } from './tokens';
import { LoginData } from '../models/login-data.interface';
import { RegisterData } from '../models/register-data.interface';
import { AuthData } from '../models/auth-data.interface';
import { UserInfo } from '../models/user-info.interface';
import { RegisterResponse } from '../models/register-response.interface';

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

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    @Inject(AUTH_OPTIONS) private clientOptions: AuthClientOptions
  ) { }

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

  register(regData: RegisterData): Observable<RegisterResponse> {
    const body = {
      client_id: this.clientOptions.clientID,
      email: regData.email,
      password: regData.password,
      connection: this.clientOptions.connection
    };

    return this.http.post(`${this.clientOptions.baseUrl}/dbconnections/signup`, body)
      .map(rsp => rsp.json());
  };

  logout(): Observable<Response> {
    return this.http.get(`${this.clientOptions.baseUrl}/v2/logout?client_id=${this.clientOptions.clientID}`);
  }

  getUserInfo(access_token: string): Observable<UserInfo> {
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${access_token}`);
    return this.http.get(`${this.clientOptions.baseUrl}/userinfo`, { headers: headers }
    )
      .map(rsp => rsp.json());
  }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

export const AUTH_PROVIDERS = [
  { provide: AUTH_OPTIONS, useValue: DEFAULT_AUTH_OPTIONS },
  AuthService,
  {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }
];
