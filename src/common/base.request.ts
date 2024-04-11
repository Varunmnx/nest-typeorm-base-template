 
export class BaseRequest {
  public readonly authInfo?: AuthInfo;
}

export class AuthInfo {
  public static get AUTHORIZATION_KEY(): string {
    return '__authorization__';
  }
  public static get USER_ID_KEY(): string {
    return '__userId__';
  }
  public static get AUTH_INFO_KEY(): string {
    return 'authInfo';
  }
  public static get JWT_AUTH_KEY(): string {
    return '__JWT-auth__';
  }

  constructor(public readonly authorization: string, public readonly userId: any, public isEmailVerified: boolean) {}
}
