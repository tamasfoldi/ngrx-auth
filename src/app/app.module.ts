import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor, StoreLogMonitorModule } from '@ngrx/store-log-monitor';

import reducer from './reducers';
import actions from './actions';
import { LoginEffects } from './effects/login.effect';
import { AuthService } from './services';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        position: 'right',
        visible: false
      })
    }),
    StoreLogMonitorModule,
    EffectsModule.run(LoginEffects)
  ],
  providers: [
    actions,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
