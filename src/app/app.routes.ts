import { Injectable } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent, RegisterComponent, DefaultSecretComponent } from './components';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/delay';
import { AuthService } from './services';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
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

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'secret',
    canActivate: [SecretGuard],
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultSecretComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent, DefaultSecretComponent];


