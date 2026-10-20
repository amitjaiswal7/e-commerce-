import express from "express";
import { multer_helper } from "../helper/multer.js";
import { login_midleware } from "../milldeware/login.midleware.js";
import { product_upload_admin_controller } from "./product.hendle.controler.js";
const product_hdenle_admin_router = express.Router();


product_hdenle_admin_router.post("/upload",login_midleware , multer_helper.single('image'), product_upload_admin_controller); 


export default product_hdenle_admin_router;