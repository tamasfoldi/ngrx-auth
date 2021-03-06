import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State, hasNotExpiredAuth } from '../reducers/auth.reducer';

@Injectable()
export class SecureGuard implements CanActivate {

  constructor(private store: Store<State>, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(hasNotExpiredAuth)
      .do(isAuthed => !isAuthed ? this.router.navigate(['/auth']) : null);
  }
}
