import { Routes } from "express";
import { ctrlRegister, ctrlLogin } from "../controllers/user.controller";

const user = Routes()

user.post("/register", ctrlRegister);
user.get("/login", ctrlLogin)