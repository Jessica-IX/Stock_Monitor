import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import {Login, Register, Logout, SetAuthToken, SetUserId} from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface AuthStateModel {
  token: string | null;
  userId: number | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    userId: null,
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static getUserId(state: AuthStateModel): number | null {
    return state.userId;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.username, action.password).pipe(
      tap((result: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          token: result.token,
          userId: result.userId
        });
        this.router.navigate(['/dashboard']);
      })
    );
  }

  @Action(SetAuthToken)
  setAuthToken(ctx: StateContext<AuthStateModel>, action: SetAuthToken) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      token: action.token
    });
  }

  @Action(SetUserId)
  setUserId(ctx: StateContext<AuthStateModel>, action: SetUserId) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userId: action.userId
    });
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.username, action.password).pipe(
      tap(() => {
        this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      userId: null,
    });
    this.router.navigate(['/']);
  }
}
