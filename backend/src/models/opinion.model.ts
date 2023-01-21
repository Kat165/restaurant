import { Schema, model } from "mongoose";

export interface Opinion{
    id:string;
    foodId:string
    nick:string;
    name:string;
    description:string;
}

export const OpinionSchema = new Schema<Opinion>({
    foodId:{type: String, required:true},
    nick:{type: String, required:true},
    name:{type: String, required:true},
    description:{type: String, required:true},
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

export const OpinionModel = model<Opinion>('opinion',OpinionSchema)