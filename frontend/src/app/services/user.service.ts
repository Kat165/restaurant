import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/User';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUSerToLocalStorage(user)
          this.userSubject.next(user)
          alert(`Welcome to Restaurant ${user.name}!
          Login succesful!`)
        },
        error: (errorResponse) =>{
          alert(`${errorResponse.error} - login failed!`)
        }
      })
    )
  }

  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUSerToLocalStorage(user)
          this.userSubject.next(user)
          alert(`Welcome to Restaurant ${user.name}!
          Register succesful!`)
        },
        error: (errorResponse) =>{
          alert(`${errorResponse.error} - register failed!`)
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload();
  }

  private setUSerToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
