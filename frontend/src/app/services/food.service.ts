import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_ADD_OPINION_URL, FOOD_ADD_URL, FOOD_BY_ID_URL, OPINION_BY_FOOD_URL, UPDATE_FOOD_RESERVED } from '../shared/constants/urls';
import { IAddFood } from '../shared/interfaces/IAddFood';
import { IOpinions } from '../shared/interfaces/IOpinions';
import { Food } from '../shared/models/Food';
import { Opinion } from '../shared/models/Opinion';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }

  getAllFoodBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId)
  }

  getFoodByPrice(price1:number,price2:number){/*
    console.log(this.getAll().filter((food: { price: number; }) => food.price>=price1 && food.price<=price2))
    return this.getAll().filter((food: { price: number; }) => food.price>=price1 && food.price<=price2)
*/  return 0;
  }

  addDish(foodAdd:IAddFood):Observable<Food>{
    return this.http.post<Food>(FOOD_ADD_URL,foodAdd).pipe(
      tap({
        next: (food) =>{

          alert(`Added food ${food.name}!`)
        },
        error: (errorResponse) =>{
          alert(`${errorResponse.error} - adding failed!`)
        }
      })
    )
  }

  addOpinion(opinion:IOpinions):Observable<Opinion>{
    return this.http.post<Opinion>(FOOD_ADD_OPINION_URL,opinion).pipe(
      tap({
        next:(op)=>{
          alert(`Added new opinion`)
        },
        error: (errorResponse) =>{
          alert(`${errorResponse.error} - adding failed!`)
        }
      })
    )
  }

  getOpinion(foodId:string):Observable<Opinion[]>{
    return this.http.get<Opinion[]>(OPINION_BY_FOOD_URL+foodId)
  }

  uptadeReserved(foodId:string, reserved:number){
    return this.http.put(UPDATE_FOOD_RESERVED,[foodId,reserved],)
  }

}
