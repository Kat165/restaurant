import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-search-price',
  templateUrl: './search-price.component.html',
  styleUrls: ['./search-price.component.css']
})
export class SearchPriceComponent {
  foods:Food[] = []
  minprice = ''
  maxprice= ''
  prices:number[] = []
  constructor(activatedRoute:ActivatedRoute, private router:Router,foodService:FoodService){
    this.foods = foodService.getAll()
    this.prices = []
    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].inStock > 0 && !this.foods[index].deleted){
        this.prices.push(this.foods[index].price)
      }
    }


    //this.minprice = Math.min.apply(null,this.prices).toString()
    //this.maxprice = Math.max.apply(null,this.prices).toString()

    activatedRoute.params.subscribe((params) => {
      console.log(this.minprice)
      console.log(params.minprice)
      if(params.minprice && params.maxprice) {
        console.log("llllllllllllllllllllll")
        this.minprice = params.minprice;
        this.maxprice = params.maxprice
      }
    })

    //this.workslide()
  }

  search(min:string,max:string):void{
    if(min && max){
      this.router.navigateByUrl('/price/'+min)
    }

  }
  workslide(){
    const rangeInput = document.querySelectorAll(".range-input input")

    rangeInput.forEach(input =>{
      input.addEventListener("input",()=>{
        let minVal = rangeInput[0] as HTMLInputElement
      })
    })
  }
}
