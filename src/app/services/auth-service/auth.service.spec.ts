/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod
} from '@angular/http';

describe('Service: Auth', () => {
  let baseUrl = 'https://tamasfoldi.eu.auth0.com'
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }]
    });
  });

  describe('login', () => {
    it('should receive auth datas', inject([AuthService, MockBackend],
      fakeAsync((service: AuthService, mockBackend: MockBackend) => {
        let resp;
        let loginUrl = `${baseUrl}/oauth/ro`;

        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(loginUrl);
          expect(c.request.method).toBe(RequestMethod.Post);
          let response = new ResponseOptions({
            body: '{"id_token": "test_id_token", "access_token": "test_access_token", "token_type": "test_type"}'
          });
          c.mockRespond(new Response(response));
        });
        service.login('test@user.com', 'testpw').subscribe(rsp => {
          resp = rsp;
        });
        tick();

        expect(resp).toEqual({ id_token: 'test_id_token', access_token: 'test_access_token', token_type: 'test_type' });
      })));
  });

  describe('register', () => {
    it('should receive auth datas', inject([AuthService, MockBackend],
      fakeAsync((service: AuthService, mockBackend: MockBackend) => {
        let resp;
        let registerUrl = `${baseUrl}/dbconnections/signup`;

        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(registerUrl);
          expect(c.request.method).toBe(RequestMethod.Post);
          let response = new ResponseOptions({
            body: '{ "_id": "testid", "email_verified": false, "email": "test@user.com" }'
          });
          c.mockRespond(new Response(response));
        });
        service.register('test@user.com', 'testpw').subscribe(rsp => {
          resp = rsp;
        });
        tick();

        expect(resp).toEqual({ _id: 'testid', email_verified: false, email: 'test@user.com' });
      })));
  });

  describe('logout', () => {
    it('should set the given redirect url', inject([AuthService, MockBackend],
      fakeAsync((service: AuthService, mockBackend: MockBackend) => {
        let resp;
        let logoutUrl = `${baseUrl}/v2/logout?client_id=e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF&returnTo=testRedirect`;

        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(logoutUrl);
          expect(c.request.method).toBe(RequestMethod.Get);
          let response = new ResponseOptions({
          });
          c.mockRespond(new Response(response));
        });
        service.logout('testRedirect').subscribe(rsp => {
          resp = rsp;
        });
        tick();

        expect(resp).toBeNull();
      })));

    it('should set the home url', inject([AuthService, MockBackend],
      fakeAsync((service: AuthService, mockBackend: MockBackend) => {
        let resp;
        let logoutUrl = `${baseUrl}/v2/logout?client_id=e5fWdeEcaXWhGBxBQ8hZMIbEuL2w5ASF&returnTo=/`;

        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(logoutUrl);
          expect(c.request.method).toBe(RequestMethod.Get);
          let response = new ResponseOptions({
          });
          c.mockRespond(new Response(response));
        });
        service.logout().subscribe(rsp => {
          resp = rsp;
        });
        tick();

        expect(resp).toBeNull();
      })));
  });

});
