import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!:Food
  startStock!:number
  constructor(activatedRoute:ActivatedRoute,foodService:FoodService,
    private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      foodService.getFoodById(params.id).subscribe(serverFood =>{
        this.food = serverFood
      })
      this.startStock = this.food.inStock
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  addQuant(){
    let p = document.getElementById('infotext')
    let x = ''
    let y =0
    if(this.food.inStock>0){
      this.food.inStock--
      this.cartService.addToCart(this.food);
      if(p!=undefined){
        if (p.textContent!=null)
          x = p.textContent
        y = parseInt(x) + 1;
        p.innerHTML = `${this.startStock - this.food.inStock}`
      }
    }
    this.cartService.addToCart(this.food);
    this.cartService.changeQuantity(this.food.id,y)
  }

  delQuant(){
    let p = document.getElementById('infotext')
    let x = ''
    let y =0
    if(this.food.inStock>0){

      //this.cartService.addToCart(this.food);
      if(p!=undefined){

        if (p.textContent!=null)
          x = p.textContent
        y = parseInt(x) - 1;
        if(y<0)
          return
        this.food.inStock++
        p.innerHTML = `${this.startStock - this.food.inStock}`
      }
    }
    //this.cartService.addToCart(this.food);
    this.cartService.changeQuantity(this.food.id,y)
  }

}
