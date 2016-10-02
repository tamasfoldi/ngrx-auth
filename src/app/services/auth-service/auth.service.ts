import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface AuthClientOptions {
  baseUrl: string;
  clientID: string;
}

export var AUTH_CLIENT_OPTIONS: AuthClientOptions = {
  baseUrl: 'https://tamasfoldi.eu.auth0.com',
  clientID: 'e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF'
};

@Injectable()
export class AuthService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private connection = 'Username-Password-Authentication';

  constructor(private http: Http, @Inject(AUTH_CLIENT_OPTIONS) private clientOptions: AuthClientOptions) { }

  login(username: string, password: string): Observable<{}> {
    let url = `${this.clientOptions.baseUrl}/oauth/ro`;

    let loginBody = {
      'client_id': this.clientOptions.clientID,
      'username': username,
      'password': password,
      'connection': this.connection,
      'scope': 'openid'
    };

    return this.http.post(url, loginBody, { headers: this.headers })
      .map(rsp => rsp.json())
      .catch(error => this.handleError(JSON.parse(error._body)));
  };

  register(email: string, password: string): Observable<{}> {
    let url = `${this.clientOptions.baseUrl}/dbconnections/signup`;

    let registerBody = {
      'client_id': this.clientOptions.clientID,
      'email': email,
      'password': password,
      'connection': this.connection
    };

    return this.http.post(url, registerBody, { headers: this.headers })
      .map(rsp => rsp.json())
      .catch(error => this.handleError(JSON.parse(error._body)));
  };

  auth(id_token: string) {
    let url = `${this.clientOptions.baseUrl}/tokeninfo`;
    let authBody = {
      id_token: id_token
    };
    return this.http.post(url, authBody, { headers: this.headers })
    .map(rsp => rsp.json())
    .catch(error => this.handleError(JSON.parse(error.body)));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', JSON.stringify(error));
    return Promise.reject(error.message || error);
  }
}

export var AUTH_CLIENT_PROVIDERS = [{
  provide: AUTH_CLIENT_OPTIONS,
  useValue: AUTH_CLIENT_OPTIONS
}];
