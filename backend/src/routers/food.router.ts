import { Router } from "express";
import { sample, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { Food, FoodModel } from "../models/food.model";
import jwt from 'jsonwebtoken';
import multer from 'multer';

const router = Router()/*
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../../../frontend/src/assets/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname)

    }
})
const upload = multer({storage:storage})*/

router.get("/seed",asyncHandler(
    async (req,res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount>0){
            res.send("Seed is already done");
            return
        }
        await FoodModel.create(sample)
        res.send("Seed id done!")
    }
))

router.get("/",asyncHandler(
    async (req,res) => {
        const foods = await FoodModel.find()
        res.send(foods);
    }
))

router.get("/search/:searchTerm",asyncHandler(
    async (req,res) => {
        const searchRegex = new RegExp(req.params.searchTerm,'i');
        const foods = await FoodModel.find({name: {$regex:searchRegex}})
        res.send(foods);
    }
))

router.get("/tags", asyncHandler(
    async(req,res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{
                    _id:'$tags',
                    count:{$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    name:'$_id',
                    count: '$count'
                }
            }
        ]).sort({count:-1})
/*
        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all)
*/
        res.send(tags)
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req,res) => {
        const foods = await FoodModel.find({tags:req.params.tagName})
        res.send(foods)
    }
))

router.get("/:foodId", asyncHandler(
    async (req,res) => {
        const food = await FoodModel.findById(req.params.foodId)
        res.send(food)
    }
))



router.post("/add"/*,upload.single("imageUrl")*/,asyncHandler(
    async (req,res) =>{
        const{name,price,tags,origins,inStock,ingredients,description,imageUrl} = req.body
        console.log(tags)
        console.log(ingredients)
        

        const newFood:Food = {
            id:'',
            name:name,
            price:price,
            origins:origins,
            inStock:inStock,
            ingredients:ingredients,
            description:description,
            imageUrl:imageUrl,
            favourite:false,
            stars:0,
            cookTime:"0",
            deleted:false,
            gallery:[],
            tags:tags
        }

        const dbfood = await FoodModel.create(newFood)
        res.send(dbfood)
    }
))

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign(
        {email:user.email,isAdmin:user.isAdmin},
        "TEXT_cccccccccccc",
        {expiresIn:"30d"}
    )

    user.token = token
    return user
}


export default router;