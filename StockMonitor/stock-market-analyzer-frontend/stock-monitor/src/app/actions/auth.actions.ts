export class Login {
  static readonly type = '[Auth] Login';
  constructor(public username: string, public password: string) {}
}

export class SetAuthToken {
  static readonly type = '[Auth] Set Auth Token';
  constructor(public token: string) {}
}

export class SetUserId {
  static readonly type = '[Auth] Set User Id';
  constructor(public userId: number) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public username: string, public password: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
