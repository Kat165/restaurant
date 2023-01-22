import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  filters = false
  user!:User
  foods:Food[] = []
  ffods:Food[] = []
  minprice:number = 0
  maxprice:number = 0
  prices:number[] = []
  added:number = 0
  filteredFood: any = [[], [], [], -1, -1];
  quants = new Map<string, number>();
  constructor(private foodService:FoodService,activatedRoute:ActivatedRoute,
    private cartService:CartService, private router:Router,private userService:UserService){
      let foodObservable: Observable<Food[]>
      activatedRoute.params.subscribe( (params) => {
      if(params.searchTerm)
        foodObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      else if(params.tag)
        foodObservable = this.foodService.getAllFoodsByTag(params.tag);
      /*else if(params.minprice && params.maxprice){]
        foodObservable = this.foodService.getFoodByPrice(params.minprice,params.maxprice)

      }*/
      else
        foodObservable = foodService.getAll()

      //let x = lastValueFrom(foodObservable)
      // firstValueFrom(foodObservable)

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods
        this.calcprice()
      })
    })
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser
    })


  }
  filterByCuisine(cuisines: any) {
    let res = [];
    for (let cuisine of cuisines) {
      for (let dish of this.foods) {
        if (dish.origins == cuisine) {
          res.push(dish);
        }
      }
    }
    return res;
  }

  filterByCategory(categories: any) {
    let res = [];
    console.log("dish")
    for (let category of categories) {
      for (let dish of this.ffods) {
        console.log(dish)
        if(dish.tags!=undefined){
          for(let tag of dish.tags){
            console.log(tag)
            if (tag == category) {
              res.push(dish);
              console.log(dish)
            }
          }

        }

      }
    }
    console.log(res)
    return res;
  }

  filterByStars(rates: any) {
    let res = [];
    for (let rate of rates) {
      for (let dish of this.ffods) {
        if (dish.stars == rate) {
          res.push(dish)
        }
      }
    }
    console.log(res)
    return res;
  }

  calcprice(){
    this.prices = []
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].inStock > 0 && !this.foods[index].deleted){
        this.prices.push(this.foods[index].price)
      }
      this.quants.set(this.foods[index].id,0)
    }


    this.minprice = Math.min.apply(null,this.prices)
    this.maxprice = Math.max.apply(null,this.prices)
  }

  deleteFood(food:Food){
    //food.deleted = true
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].id==food.id){
        this.foods[index].deleted = true
        this.foodService.deleteById(this.foods[index].id)
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
    this.foods = foods1.concat(foods2)*/
  }

  AddClick(food:Food){
    if(food.inStock>0){
      food.inStock--
      this.cartService.addToCart(food);
      food.reserved++
      //this.quants.set(food.id,m)
      this.cartService.changeQuantity(food.id, food.reserved)
      this.foodService.uptadeReserved(food.id,food.reserved)
    }
  }

  MinClick(food:Food){
    if(food.reserved>0){
      food.inStock++
      food.reserved--
      this.cartService.changeQuantity(food.id, food.reserved)
      this.foodService.uptadeReserved(food.id,food.reserved)
      if(food.reserved == 0){
        this.cartService.removeFromCart(food.id)
      }
    }
  }

  updatefilteredDishes(event: any) {
    this.filteredFood = event

  }

  getDishes(){
    this.ffods = []
    if (this.filteredFood[0].length > 0) {
      this.ffods = this.filterByCuisine(this.filteredFood[0])
    }
    else this.ffods = this.foods

    if (this.filteredFood[1].length > 0) {
      this.ffods = this.filterByCategory(this.filteredFood[1])
    }

    if (this.filteredFood[2].length > 0) {
      this.ffods = this.filterByStars(this.filteredFood[2])
    }

    if (this.filteredFood[3] != -1 && this.filteredFood[3] != 0) {
      this.ffods = this.ffods.filter(dish => {
        return dish.price >= this.filteredFood[3]
      })
    }

    if (this.filteredFood[4] != -1 && this.filteredFood[4] != 0) {
      this.filteredFood = this.ffods.filter(dish => {
        return dish.price <= this.filteredFood[4],dish
      })
    }
    this.foods = this.ffods
    //return this.ffods
    return this.foods
  }

  ClearAll(){
    let foodObservable: Observable<Food[]>
    foodObservable = this.foodService.getAll()
    foodObservable.subscribe((serverFoods) => {
      this.foods = serverFoods
      this.calcprice()
    })
  }

  hideFilters(){
    if(!this.filters)
      this.filters = true
    else
      this.filters = false
  }
}
