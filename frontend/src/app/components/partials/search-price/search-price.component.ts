import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-search-price',
  templateUrl: './search-price.component.html',
  styleUrls: ['./search-price.component.css']
})
export class SearchPriceComponent {
  foods:Food[] = []
  minprice:number
  maxprice:number
  prices:number[] = []
  constructor(activatedRoute:ActivatedRoute, private router:Router){

    for (let index = 0; index < this.foods.length; index++) {
      if(this.foods[index].inStock > 0)
        this.prices.push(this.foods[index].price)
    }
    this.minprice = Math.min.apply(null,this.prices)
    this.maxprice = Math.max.apply(null,this.prices)
  }
}
