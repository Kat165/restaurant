import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-dish-filter',
  templateUrl: './dish-filter.component.html',
  styleUrls: ['./dish-filter.component.css']
})
export class DishFilterComponent {
  filters = true
  cuisineFilter: any = [];
  categoryFilter: any = [];
  raitingFilter: any = [];
  priceFilterMax: number = 0;
  priceFilterMin: number = 0;
  minPrice!: number;
  maxPrice!: number;
  foods:Food[] = []
  tags:any = []
  minprice:number = 0
  maxprice:number = 0
  prices:number[] = []
  origins:any = []
  filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]
  @Output() filteredDishesEmit = new EventEmitter()

  constructor(private foodService:FoodService){
      let foodObservable: Observable<Food[]>
      foodObservable = foodService.getAll()
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods
        this.calcprice()
        this.AddOrigins()
      })
      foodService.getAllTags().subscribe(serverTags => {
        this.tags = serverTags
      });

  }
  AddOrigins(){
    let x:string[] = []
    for(let f of this.foods){
      x.push(f.origins)
    }
    this.origins = x.filter((value, index) => x.indexOf(value) === index);
  }
  calcprice(){
    this.prices = []
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].inStock > 0 && !this.foods[index].deleted){
        this.prices.push(this.foods[index].price)
      }
    }


    this.minprice = Math.min.apply(null,this.prices)
    this.maxprice = Math.max.apply(null,this.prices)
  }

  hideFilters(){
    if(!this.filters)
      this.filters = true
    else
      this.filters = false
  }

  addCuisine(event: any) {
    if (event.target.checked) {
      this.cuisineFilter.push(event.target.value);
    }
    else {
      this.cuisineFilter = this.cuisineFilter.filter((filter: any) => {
        return filter != event.target.value
      })
    }
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]

    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  addCategory(event: any) {
    if (event.target.checked) {
      this.categoryFilter.push(event.target.value);
    }
    else {
      this.categoryFilter = this.categoryFilter.filter((filter: any) => {
        return filter != event.target.value
      })
    }
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]

    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  addStars(event: any, rate: number) {
    if (event.target.checked) {
      this.raitingFilter.push(rate);
    }
    else {
      this.raitingFilter = this.raitingFilter.filter((filter: any) => {
        return filter != rate
      })
    }
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]

    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  updateMinPrice(event: any) {
    this.priceFilterMin = parseInt(event.target.value);
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax];

    this.filteredDishesEmit.emit(this.filteredDishes);
  }
  updateMaxPrice(event: any) {
    this.priceFilterMax = parseInt(event.target.value);
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax];

    this.filteredDishesEmit.emit(this.filteredDishes);

  }


}
