import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from './actions/auth.actions';

@Component({
  selector: 'app-logout-button',
  template: `
    <button mat-raised-button color="warn" (click)="logout()">Logout</button>
  `,
  styles: []
})
export class LogoutButtonComponent {

  constructor(private store: Store) { }

  logout() {
    this.store.dispatch(new Logout());
  }

}
