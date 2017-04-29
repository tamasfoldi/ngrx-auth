import { Provider } from '@angular/core';
import { AUTH_PROVIDERS } from './services/auth.service';
import { AuthDataStoreService } from 'app/services/auth-data-store.service';

export const APP_PROVIDERS: Provider[] = [
  AUTH_PROVIDERS,
  AuthDataStoreService
];
