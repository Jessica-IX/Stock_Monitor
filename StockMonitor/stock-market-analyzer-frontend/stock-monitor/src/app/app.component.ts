import {Component, OnInit} from '@angular/core';
import { Store } from '@ngxs/store';
import {SetAuthToken, SetUserId} from './actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stock-monitor';
  constructor(private store: Store) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this.store.dispatch(new SetAuthToken(token));
      this.store.dispatch(new SetUserId(+userId));
    }
  }
}
