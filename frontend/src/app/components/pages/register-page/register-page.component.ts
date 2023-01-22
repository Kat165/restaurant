import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm!:FormGroup;
  isSubmited = false;

  returnUrl = '/menu'

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private cartService:CartService
  ){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmedPassword:['',Validators.required]
    },{
      validators:PasswordsMatchValidator('password','confirmedPassword')
    });

    //this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
  }

  get fc(){
    return this.registerForm.controls
  }

  submit(){
    this.isSubmited = true
    if(this.registerForm.invalid) return

    const fv = this.registerForm.value;

    const user:IUserRegister = {
      name: fv.name,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmedPassword
    }

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl)
    })

    this.cartService.clearCart()
  }

}
