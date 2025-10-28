import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { catchError, take, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserLogin, UserSignup } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  url = environment.url;

  private _user = signal<User | null>(null);

  private httpClient: HttpClient;

  public get token() {
    return localStorage.getItem('token');
  }

  public get user() {
    return this._user();
  }

  public keepLogin = signal(false);

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  emailSignUp(user: UserSignup, keepLoggedIn: boolean) {
    return this.auth(
      user,
      keepLoggedIn,
      `${this.url}/app/auth/signupEmail`,
      'An error has occured while signing up'
    );
  }

  emailLogin(user: UserLogin, keepLoggedIn: boolean) {
    return this.auth(
      user,
      keepLoggedIn,
      `${this.url}/app/auth/loginEmail`,
      'An error has occured while logging in'
    );
  }

  googleAuth(userData: any): User | any {
    return this.http
      .post<User | any>(`${this.url}/app/auth/google`, userData)
      .pipe(
        take(1),
        tap((data: any) => {
          let user = new User(
            data.user._id,
            data.user.userName,
            data.user.email
          );
          this._user.set(user)
          localStorage.setItem('token', data.token);
          return data;
        })
      );
  }

  auth(
    user: UserLogin | UserSignup,
    keepLoggedIn: boolean,
    url: string,
    errorMessage: string
  ): User | any {
    if (keepLoggedIn) {
      localStorage.setItem('keepLogin', 'true');
    }
    return this.httpClient.post<User | any>(url, user).pipe(
      take(1),
      tap((data: User | any) => {
        if (data.msg) {
          return data;
        }
        let user = new User(
          data.user._id,
          data.user.userName,
          data.user.email,
          data.user.telephone
        );
        this._user.set(user);
        localStorage.setItem('token', data.token);
        return data;
      }),
      catchError((error) => {
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  autoCheckUserJWT() {
    return this.http
      .get<User | any>(`${this.url}/app/auth/checkLoginWithJWT`)
      .pipe(
        take(1),
        tap((data) => {
          if (data) {
            let user = new User(data._id, data.userName, data.email);
            this._user.set(user)
            return data;
          } else {
            return data.msg;
          }
        })
      );
  }
}
