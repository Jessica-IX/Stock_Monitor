import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
