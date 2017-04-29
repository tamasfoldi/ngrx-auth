import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './containers/login-view/login-view.component';
import { RegisterViewComponent } from './containers/register-view/register-view.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegisterViewComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
