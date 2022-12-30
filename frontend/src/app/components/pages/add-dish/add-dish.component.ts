import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent {
  foods:Food[] = []
  constructor(private foodService:FoodService,activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params) =>{
      foodService.getAll().subscribe(serverFoods => {
        this.foods = serverFoods
      })
    })
  }

  AddFood(){
    console.log("mmmmmmmmmm")
    let hname = document.getElementById('name') as HTMLInputElement | null;
    let hprice = document.getElementById('price') as HTMLInputElement | null;
    let htags = document.getElementById('tags') as HTMLInputElement | null;
    let horigins = document.getElementById('origins') as HTMLInputElement | null;
    let hstock = document.getElementById('stock') as HTMLInputElement | null;
    let hingredients = document.getElementById('ingrediens') as HTMLInputElement | null;
    let hdesc = document.getElementById('desc') as HTMLInputElement | null;
    let name = hname?.value
    let price = hprice?.value
    let tags = htags?.value
    let origins = horigins?.value
    let stock = hstock?.value
    let ingredients = hingredients?.value
    let desc = hdesc?.value
    if(name == null || name == undefined) return
    console.log("name")
    if(price == null || price == undefined) return
    console.log("price")
    if(tags == undefined) return
    console.log("tags")
    if(origins == null || origins == undefined) return
    console.log("origins")
    if(stock == null || stock == undefined) return
    console.log("stock")
    if(ingredients == null || ingredients == undefined) return
    console.log("ing")
    if(desc == null || desc == undefined) return
    console.log("desc")
    let tagstab = tags.split(" ");
    let ingtab = ingredients.split(",")
    let id = this.foods.length+1
    let dish = new Food(id.toString(),name,parseInt(price),tagstab,false,0,'assets/gallery/12_1.jpg',origins,'10',
    parseInt(stock),ingtab,desc,[''],false)
    this.foods.push(dish)
    console.log(this.foods)
  }
}
