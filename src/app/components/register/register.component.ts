import { Component } from '@angular/core';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { AppState, isRegistering } from '../../reducers';
import { Observable } from 'rxjs/Rx';
import { RegisterActions } from '../../actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  isRegistering$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private registerActions: RegisterActions) {
      this.isRegistering$ = this.store.let(isRegistering());
  }

  register() {
    let usr = Object.assign({}, this.user);
    this.store.dispatch(this.registerActions.register(usr));
    this.user = new User();
  }

}
