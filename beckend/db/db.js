import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connexctdb = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(" mongo connected")
    } catch (error) {
        console.log("mongo error "+error)
    }
}