import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, NonSecretComponent } from './components';
import { AuthGuardService } from './services';

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
    path: 'non-secret',
    component: NonSecretComponent
  },
  {
    path: 'secret',
    loadChildren: 'app/secret-module/secret-module.module#SecretModuleModule',
    canLoad: [AuthGuardService]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent];


