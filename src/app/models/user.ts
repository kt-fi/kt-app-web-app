export class User {
    constructor(
      public userId: string,
      public userName: string,
      public email: string,
      public telephone?: string,
      public pets?: string[],
      public token?: string,
      ){}
  }

  export interface UserSignup {
    userName: string,
    email: string,
    password: string,
    telephone?: string,
  }

  export interface UserLogin {
    email: string,
    password: string,
}
  