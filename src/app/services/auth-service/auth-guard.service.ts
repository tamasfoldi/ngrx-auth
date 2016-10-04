import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class SecretGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  canLoad(route: Route): Observable<boolean> {
    return this.guard();
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.guard();
  }

  guard(): Observable<boolean> {
    let token = localStorage.getItem('id_token');
    return !token
      ? this.handleAuthFail()
      : this.authService.auth(token)
        .map(() => true)
        .catch(() => this.handleAuthFail());
  }

  handleAuthFail(): Observable<boolean> {
    this.router.navigate(['/auth']);
    return Observable.of(false);
  }
}
