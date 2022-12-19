import { Injectable } from '@angular/core';
import { sample } from 'src/data';
import { Food } from '../shared/models/Food';

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
}
