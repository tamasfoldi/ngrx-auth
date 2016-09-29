import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState, isLoggedIn, getUser } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  isAuthed$: Observable<boolean>;
  authedUsername$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isAuthed$ = this.store.let(isLoggedIn());
    this.authedUsername$ = this.store.let(getUser()).map(user => user.username);
  }
}
