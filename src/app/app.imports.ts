import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MdButtonModule } from '@angular/material';
import { routing } from './app.routing';
import { AuthEffects } from './effects/auth.effects';
import { reducer } from './reducers/auth.reducer';

export const APP_IMPORTS = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpModule,
  routing,

  StoreModule.provideStore({ auth: reducer }),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  EffectsModule.runAfterBootstrap(AuthEffects),

  MdButtonModule
];
