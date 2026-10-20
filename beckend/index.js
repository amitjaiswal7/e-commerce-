import express from "express";
import cors from "cors";
import { connexctdb } from "./db/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import product_router from "./product/product.router.js";
import helmet from 'helmet';
import login_router from "./login/user.router.js";
import product_hdenle_admin_router from "./product_hendle_admin/product.hendle.router.js";

dotenv.config();


const app = express();
app.use(helmet())
app.use(cookieParser())
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connexctdb();

app.use("/api", login_router);
app.use("/api",product_router)
app.use("/api", product_hdenle_admin_router)
app.listen(process.env.PORT, () => {
  console.log("running");
});