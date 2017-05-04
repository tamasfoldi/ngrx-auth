import { Provider } from '@angular/core';
import { AUTH_PROVIDERS } from './services/auth.service';
import { AuthDataStoreService } from './services/auth-data-store.service';
import { AuthGuard } from './guards/auth.guard';

export const APP_PROVIDERS: Provider[] = [
  AUTH_PROVIDERS,
  AuthDataStoreService,
  AuthGuard
];
