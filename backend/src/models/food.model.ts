import { Schema, model } from "mongoose";

export interface Food{
    id:string;
    name:string;
    price:number;
    tags:string[];
    favourite:boolean;
    stars:number;
    imageUrl?:string;
    origins:string;
    cookTime:string;
    inStock:number;
    reserved:number;
    ingredients:string[];
    description:string;
    gallery:string[];
    deleted:boolean;
}

export const FoodSchema = new Schema<Food>(
    {
        name:{type: String, required:true},
        price:{type: Number, required:true},
        tags:{type: [String]},
        favourite:{type: Boolean, default:false},
        stars:{type: Number, required:true},
        imageUrl:{type: String, required:true},
        origins:{type: String, required:true},
        cookTime:{type: String, required:true},
        inStock:{type: Number, required:true},
        reserved:{type:Number},
        ingredients:{type: [String]},
        description:{type: String, required:true},
        gallery:{type: [String], required:true},
        deleted:{type: Boolean, default:false},

    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const FoodModel = model<Food>('food', FoodSchema);