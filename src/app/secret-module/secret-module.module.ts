import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecretModuleComponent } from './secret-module.component';
import { SecretGuard } from '../services/auth-service/auth-guard.service';

const ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [SecretGuard],
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: SecretModuleComponent }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [SecretModuleComponent]
})
export class SecretModuleModule { }
