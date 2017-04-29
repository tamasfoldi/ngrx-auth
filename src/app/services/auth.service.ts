import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginData } from '../models/login-data.interface';
import { UserData } from '../models/user-data.interface';

export interface AuthClientOptions {
  baseUrl: string;
  clientID: string;
}

export let AUTH_CLIENT_OPTIONS: AuthClientOptions = {
  baseUrl: 'https://tamasfoldi.eu.auth0.com',
  clientID: 'e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF'
};

@Injectable()
export class AuthService {
  private connection = 'Username-Password-Authentication';

  constructor(private http: Http, @Inject(AUTH_CLIENT_OPTIONS) private clientOptions: AuthClientOptions) { }

  login(loginData: LoginData): Observable<UserData> {
    return this.http.post('login', loginData)
      .map(rsp => rsp.json());
  };

  register(email: string, password: string): Observable<{}> {
    const url = `${this.clientOptions.baseUrl}/dbconnections/signup`;

    const registerBody = {
      'client_id': this.clientOptions.clientID,
      'email': email,
      'password': password,
      'connection': this.connection
    };

    return this.http.post(url, registerBody)
      .map(rsp => rsp.json());
  };

  auth(id_token: string) {
    const url = `${this.clientOptions.baseUrl}/tokeninfo`;
    const authBody = {
      id_token: id_token
    };
    return this.http.post(url, authBody)
      .map(rsp => rsp.json());
  }
}

export let AUTH_CLIENT_PROVIDERS = [{
  provide: AUTH_CLIENT_OPTIONS,
  useValue: AUTH_CLIENT_OPTIONS
}];
