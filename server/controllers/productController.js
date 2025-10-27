import Product from "../models/Product.js";
import express from express;
import {v2 as cloudinary} from "cloudinary";

//Add product : /api/product/add
export const addProduct = async (req, res)=>{
    try{
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resourse_type: 'image'});
                return result.secure_url
            })
        )
        await Product.create({...productData, image:imagesUrl})

        return res.json({success: true, message:"Product added"})

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//get product : /api/product/list
export const productList = async (req, res)=>{

}

//get single product : /api/product/id
export const productById = async (req, res)=>{

}

//chnage product inStock : /api/product/stock
export const changeStock = async (req, res)=>{

}