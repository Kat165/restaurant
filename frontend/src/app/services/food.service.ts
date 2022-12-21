import { Injectable } from '@angular/core';
import { sample, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample
  }

  getAllFoodBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || food.origins.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags():Tag[]{
    return sample_tags
  }

  getAllFoodsByTag(tag:string):Food[]{
    return this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string){
    return this.getAll().find(food => food.id == foodId) ?? new Food('null','null',-1,['null'],false,-1,'null','null','null',-1,['null'],'null',['null'],true)
  }

  getFoodByPrice(price1:number,price2:number){
    console.log(this.getAll().filter((food: { price: number; }) => food.price>=price1 && food.price<=price2))
    return this.getAll().filter((food: { price: number; }) => food.price>=price1 && food.price<=price2)

  }



}
