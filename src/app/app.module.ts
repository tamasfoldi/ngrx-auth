import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { RouterStoreModule } from '@ngrx/router-store';

import reducer from './reducers';
import actions from './actions';
import { LoginEffects } from './effects/login.effects';
import { RegisterEffects } from './effects/register.effects';
import { AuthService, AUTH_CLIENT_PROVIDERS } from './services/auth-service/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { routedComponents, appRoutes, AllowSecret } from './app.routes';
import { DefaultSecretComponent } from './components/default-secret/default-secret.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    routedComponents,
    DefaultSecretComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreLogMonitorModule,
    EffectsModule.run(LoginEffects),
    EffectsModule.run(RegisterEffects),
    RouterStoreModule.connectRouter(),
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  providers: [
    actions,
    AuthService,
    AllowSecret,
    AUTH_CLIENT_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
