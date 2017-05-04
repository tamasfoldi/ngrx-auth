import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State, hasNotExpiredAuth } from '../reducers/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(hasNotExpiredAuth)
      .map(isAuthed => !isAuthed)
      .do(notAuthed => !notAuthed ? this.router.navigate(['/secure']) : null);
  }
}
