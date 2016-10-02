import { Routes, RouterModule, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getLoginState } from './reducers';
import { LoginComponent, RegisterComponent, DefaultSecretComponent } from './components';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AllowSecret implements CanActivateChild {
  private isLoggedIn = false;
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.let(getLoginState()).subscribe(state => this.isLoggedIn = state.isLoggedIn);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
    return this.isLoggedIn;
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
    canActivateChild: [AllowSecret],
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultSecretComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent, DefaultSecretComponent];


