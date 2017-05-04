import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs/Rx';
import { State } from '../../reducers/auth.reducer';
import * as auth from '../../actions/auth.actions';
import { RegisterData } from '../../models/register-data.interface';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();

  constructor(private store: Store<State>, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  ngOnInit() {
    this.actions$
      .ofType(auth.REGISTER_SUCCESS)
      .takeUntil(this.componentDestroyed$)
      .subscribe(() => this.router.navigate(['../login'], { relativeTo: this.route }));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  handleRegister(regData: RegisterData) {
    this.store.dispatch(new auth.RegisterAction(regData));
  }

}
