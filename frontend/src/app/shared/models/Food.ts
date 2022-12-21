export class Food{
  id!:string;
  name!:string;
  price!:number;
  tags?:string[];
  favourite!:boolean;
  stars!:number;
  imageUrl!:string;
  origins!:string;
  cookTime!:string;
  inStock!:number;
  ingredients!:string[];
  description!:string;
  gallery!:string[];
  deleted!:boolean;
  constructor(id:string,name:string,price:number,tags:string[],favourite:boolean,stars:number,imageUrl:string,origins:string,
    cookTime:string,inStock:number, ingredients:string[], description:string, gallery:string[], deleted:boolean){
    this.id = id
    this.name = name
    this.price = price
    this.tags = tags
    this.favourite = favourite
    this.stars = stars
    this.imageUrl = imageUrl
    this.origins = origins
    this.cookTime = cookTime
    this.inStock = inStock
    this.ingredients = ingredients
    this.description = description
    this.gallery = gallery
    this.deleted = deleted
  }
}
