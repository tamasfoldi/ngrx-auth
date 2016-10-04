import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecretModuleComponent } from './secret-module.component';

const ROUTES: Routes = [
  {
    path: '',
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
