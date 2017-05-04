import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './containers/login-view/login-view.component';
import { RegisterViewComponent } from './containers/register-view/register-view.component';
import { UserInfoViewComponent } from './containers/user-info-view/user-info-view.component';
import { AuthGuard } from './guards/auth.guard';
import { SecureGuard } from './guards/secure.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginViewComponent },
      { path: 'register', component: RegisterViewComponent }
    ]
  },
  { path: 'secure', component: UserInfoViewComponent, canActivate: [SecureGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);
