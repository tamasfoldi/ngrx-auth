import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';

import reducer from './reducers';
import actions from './actions';
import { LoginEffects } from './effects/login.effects';
import { RegisterEffects } from './effects/register.effects';
import { AuthService } from './services';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { routedComponents, routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreLogMonitorModule,
    EffectsModule.run(LoginEffects),
    EffectsModule.run(RegisterEffects),
    routing
  ],
  providers: [
    actions,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
