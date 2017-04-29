import { Provider } from '@angular/core';
import { AUTH_PROVIDERS } from './services/auth.service';
import { AUTH_DATA_STORE_PROVIDERS } from 'app/services/auth-data-store.service';

export const APP_PROVIDERS: Provider[] = [
  AUTH_PROVIDERS,
  AUTH_DATA_STORE_PROVIDERS
];
