import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { IOpinions } from 'src/app/shared/interfaces/IOpinions';
import { Food } from 'src/app/shared/models/Food';
import { Opinion } from 'src/app/shared/models/Opinion';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!:Food
  startStock!:number
  opinionsForm!:FormGroup;
  isSubmited = false;
  user!:User;
  opss:Opinion[] = []
  constructor(activatedRoute:ActivatedRoute,private foodService:FoodService,
    private cartService:CartService, private router:Router,private formBuilder:FormBuilder,private userService:UserService){
      let opinionObservable: Observable<Opinion[]>
      activatedRoute.params.subscribe((params) => {
      if(params.id){
      foodService.getFoodById(params.id).subscribe(serverFood =>{
        this.food = serverFood
        this.startStock = this.food.inStock
        opinionObservable = foodService.getOpinion(this.food.id)
        opinionObservable.subscribe((serverOps) =>{
          this.opss = serverOps
      })
      })


      }

      userService.userObservable.subscribe((newUser)=>{
        this.user = newUser
      })

    })


  }

  ngOnInit(){
    this.opinionsForm = this.formBuilder.group({
      name:['',Validators.required],
      description:['',[Validators.required,Validators.minLength(50),Validators.maxLength(500)]]
    })
  }

  submit(){
    this.isSubmited = true
    if(this.opinionsForm.invalid) return

    const fv  = this.opinionsForm.value;

    const opinion:IOpinions = {
      foodId: this.food.id,
      nick:this.user.name,
      name:fv.name,
      description:fv.description
    }

    this.foodService.addOpinion(opinion).subscribe(_ =>{
      console.log(opinion)
    })
  }

  get fc(){
    return this.opinionsForm.controls
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  addQuant(){
    if(this.food.inStock>0){
      this.food.inStock--
      this.cartService.addToCart(this.food);
      this.food.reserved++
      //this.quants.set(food.id,m)
      //console.log(this.quants.get(food.id))
      this.cartService.changeQuantity(this.food.id, this.food.reserved)
    }
  }

  delQuant(){
    if(this.food.reserved>0){
      this.food.inStock++
      this.food.reserved--
      this.cartService.changeQuantity(this.food.id, this.food.reserved)
      if(this.food.reserved == 0){
        this.cartService.removeFromCart(this.food.id)
      }
    }
  }

}
