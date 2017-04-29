import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appRoutes } from './app.routing';
import { AuthEffects } from './effects/auth.effects';
import { reducer } from './reducers/auth.reducer';

export const APP_IMPORTS = [
  BrowserModule,
  HttpModule,
  StoreModule.provideStore({ auth: reducer }),
  appRoutes,
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  EffectsModule.run(AuthEffects)
];
