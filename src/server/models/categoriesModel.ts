import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    id: Number,
    title: String,
    imageUrl:String,
    route:String
})
export const Category = mongoose.model('Category',categoriesSchema)