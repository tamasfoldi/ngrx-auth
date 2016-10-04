import { Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginComponent, RegisterComponent, DefaultSecretComponent } from './components';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState, getLoginState } from './reducers';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/delay';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.let(getLoginState())
      .map(state$ => state$.isLoggedIn)
      .do(l => console.log(l));
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


