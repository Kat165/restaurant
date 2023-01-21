import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user!:User
  constructor(private userService:UserService, private router: Router){
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.user.isAdmin)

    if(!this.user.name){

      this.router.navigateByUrl('/login')
    }
    if(!this.user.isAdmin){

      this.router.navigateByUrl('/menu')
    }
    return true;
  }

}
