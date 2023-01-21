import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user!:User
  constructor(private userService:UserService, private router: Router){
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.user.name){

        this.router.navigateByUrl('/login')
      }
    return true;
  }

}
