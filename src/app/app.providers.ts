import { Provider } from '@angular/core';
import { AUTH_PROVIDERS } from './services/auth.service';
import { AUTH_DATA_STORE_PROVIDERS } from './services/auth-data-store.service';
import { AuthGuard } from './guards/auth.guard';
import { SecureGuard } from 'app/guards/secure.guard';

export const APP_PROVIDERS: Provider[] = [
  AUTH_PROVIDERS,
  AUTH_DATA_STORE_PROVIDERS,
  AuthGuard,
  SecureGuard
];
