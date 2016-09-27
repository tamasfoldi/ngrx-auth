import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private clientOptions: Auth0ClientOptions = {
    domain: 'https://tamasfoldi.eu.auth0.com',
    clientID: 'e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF',
    callbackURL: ''
  };

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private connection = 'Username-Password-Authentication';

  constructor(private http: Http) { }

  login(username: string, password: string): Observable<{}> {
    let url = `${this.clientOptions.domain}/oauth/ro`;

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
    let url = `${this.clientOptions.domain}/dbconnections/signup`;

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

  logout(returnUrl?: string): Observable<{}> {
    let url = `${this.clientOptions.domain}/v2/logout?client_id=${this.clientOptions.clientID}&returnTo=${returnUrl ? returnUrl : '/'}`;

    return this.http.get(url, {headers: this.headers})
      .map(rsp => rsp.json())
      .catch(error => this.handleError(JSON.parse(error._body)));
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
