import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login, Register } from '../../actions/auth.actions';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showLoginForm = true;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.registerForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.loginError = null;
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(new Login(username, password)).pipe(
      catchError(error => {
        this.loginError = 'Invalid username or password';
        return of(null);
      })
    ).subscribe(success => {
      if (success) {
        const token = this.store.selectSnapshot(state => state.auth.token);
        const userId = this.store.selectSnapshot(state => state.auth.userId);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  register() {
    const { username, password } = this.registerForm.value;
    this.store.dispatch(new Register(username, password)).subscribe(
      () => {
        console.log('Registration successful, redirecting to login');
        this.router.navigate(['/login']);
        this.showLoginForm = true;
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }

}
