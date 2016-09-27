import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent } from './components';


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
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent, RegisterComponent];


