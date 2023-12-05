import { Router } from "express";
import { authRequired } from "../middlewares/authJWT.js";
import { ctrlCreatePost, ctrlGetAllPost, ctrlDeletePost, ctrlUpdatePost, ctrlGetPost } from "../controllers/postCtrl.js";

const postRouter = Router();

postRouter.get("/posts", ctrlGetAllPost);
postRouter.get("/:id", ctrlGetPost);
postRouter.post("/post", authRequired, ctrlCreatePost);
postRouter.delete("/:id", authRequired, ctrlDeletePost);
postRouter.put("/:id", authRequired, ctrlUpdatePost);

export default postRouter;