import { Router } from "express";
import { sample, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { Food, FoodModel } from "../models/food.model";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { Opinion, OpinionModel } from "../models/opinion.model";

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
        

        const newFood:Food = {
            id:'',
            name:name,
            price:price,
            origins:origins,
            inStock:inStock,
            reserved:0,
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

router.post("/addOpinion",asyncHandler(
    async(req,res)=>{
        const{foodId,nick,name,description} = req.body

        const newOp:Opinion = {
            id:'',
            foodId:foodId,
            nick:nick,
            name:name,
            description:description
        }
        const dbop = await OpinionModel.create(newOp)
        res.send(dbop)
    }
))

router.get("/opinion/:foodId", asyncHandler(
    async (req,res) => {
        const opinions = await OpinionModel.find({foodId:req.params.foodId})
        res.send(opinions)
    }
))

router.patch("/update", asyncHandler(
    async(req,res) =>{
        console.log("mmm")
        const food = await FoodModel.findById(req.params.foodId)
        console.log(food)
        if(food != undefined)
            food.reserved = parseInt(req.params.reserved)
        res.send(food)
    }
))

router.delete("/delete/:foodId",asyncHandler(
    async(req,res) =>{
        console.log("del")
        const food = await FoodModel.findById(req.params.foodId)
        console.log(food)
        res.send(food)
    }
))


export default router;