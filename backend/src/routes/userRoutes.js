import { Router } from "express";
import { ctrlRegister, ctrlLogin, crtlLogout, ctrlProfile } from "../controllers/userCtrl.js";
import { authRequired } from "../middlewares/authJWT.js";

const userRouter = Router();

userRouter.post("/register", ctrlRegister);
userRouter.post("/login", ctrlLogin);
userRouter.post("/logout", crtlLogout)
userRouter.get("/profile", authRequired, ctrlProfile)

export default userRouter;