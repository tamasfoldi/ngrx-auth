import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, DefaultSecretComponent } from './components';

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
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultSecretComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent, DefaultSecretComponent];


