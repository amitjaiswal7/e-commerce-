import express from "express";
import { login_midleware } from "../milldeware/login.midleware.js";
import { create_user } from "./user.handle.js";
import { get_current_user } from "./user.handle.js";
import { login_user } from "./user.handle.js";
import { Logout_user } from "./user.handle.js";
import { refresh_access_token } from "./user.handle.js";
const login_router = express.Router();

login_router.post("/create", create_user);
login_router.get("/check", login_midleware,get_current_user);
login_router.post("/login", login_user);
login_router.get("/logout", Logout_user)
login_router.post("/refresh", refresh_access_token);
export default login_router;