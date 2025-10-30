import Product from "../models/Product.js";
import express from 'express';
import { v2 as cloudinary } from "cloudinary";

//Add product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resourse_type: 'image' });
                return result.secure_url
            })
        )
        await Product.create({ ...productData, image: imagesUrl })

        return res.json({ success: true, message: "Product added" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//get product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//get single product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}


// Change product stock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        if (!id || typeof inStock === "undefined") {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const product = await Product.findByIdAndUpdate(id, { inStock });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Stock updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
