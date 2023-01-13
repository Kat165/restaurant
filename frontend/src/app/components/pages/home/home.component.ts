import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods:Food[] = []
  minprice:number = 0
  maxprice:number = 0
  prices:number[] = []
  quants = new Map<string, number>();
  constructor(private foodService:FoodService,activatedRoute:ActivatedRoute,
    private cartService:CartService, private router:Router){
      let foodObservable: Observable<Food[]>
      activatedRoute.params.subscribe( (params) => {
      if(params.searchTerm)
        foodObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      else if(params.tag)
        foodObservable = this.foodService.getAllFoodsByTag(params.tag);
      /*else if(params.minprice && params.maxprice){
        console.log("mmmmmmmmmmmmmmmmm")
        foodObservable = this.foodService.getFoodByPrice(params.minprice,params.maxprice)

      }*/
      else
        foodObservable = foodService.getAll()

      //let x = lastValueFrom(foodObservable)
      // firstValueFrom(foodObservable)

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods
        console.log("fff")
        console.log(this.foods)
        this.calcprice()
      })
    })

  }

  calcprice(){
    this.prices = []
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].inStock > 0 && !this.foods[index].deleted){
        this.prices.push(this.foods[index].price)
      }
      this.quants.set(this.foods[index].id,0)
    }
    console.log("prices")
    console.log(this.prices)


    this.minprice = Math.min.apply(null,this.prices)
    this.maxprice = Math.max.apply(null,this.prices)
  }

  deleteFood(food:Food){
    //food.deleted = true
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].id==food.id){
        this.foods[index].deleted = true
      }
    }
    this.calcprice()/*
    this.foods.forEach((f,index)=>{
      if(f.id == food.id){
        let foods1 = this.foods.slice(0,index)
        let foods2 = this.foods.slice(index+1)
        this.foods = foods1.concat(foods2)
      }
    })
    let foods1 = this.foods.slice(0,parseInt(food.id)-1)
    let foods2 = this.foods.slice(parseInt(food.id))
    console.log(foods1)
    console.log(foods2)
    this.foods = foods1.concat(foods2)*/
  }
/*
  AddClick(food:Food){
    if(food.inStock>0){
      food.inStock--
      this.cartService.addToCart(food);
      let idd = food.id
      let q = this.quants.get(food.id)
      console.log(q)
      if(!q)
        q = 0
      let m = q+1
      this.quants.set(food.id,m)
      console.log(this.quants.get(food.id))
      this.cartService.changeQuantity(food.id, m)

      console.log(this.quants)
    }
  }*/
}
