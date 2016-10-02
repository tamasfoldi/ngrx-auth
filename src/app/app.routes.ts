import {
  Routes, RouterModule, CanActivateChild, RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginComponent, RegisterComponent, DefaultSecretComponent } from './components';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AllowSecret implements CanActivateChild {
  constructor(private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!tokenNotExpired()) {
      this.router.navigate(['/auth']);
    }
    return tokenNotExpired();
  }
}

@Injectable()
export class AllowAuth implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (tokenNotExpired()) {
      this.router.navigate(['/secret']);
    }
    return !tokenNotExpired();
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
    canActivateChild: [AllowAuth],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'secret',
    canActivateChild: [AllowSecret],
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultSecretComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent, DefaultSecretComponent];


