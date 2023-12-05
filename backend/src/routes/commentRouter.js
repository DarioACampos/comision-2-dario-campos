import { Router } from "express";
import { authRequired } from "../middlewares/authJWT.js";
import { ctrlCreateComments, ctrlDeleteComment, ctrlGetAllComment, ctrlGetComment, ctrlUpdateComment } from "../controllers/commentCtrl.js";

const commentRouter = Router();

commentRouter.get("/:id", ctrlGetComment)
commentRouter.get("/", ctrlGetAllComment)
commentRouter.post("/:id", authRequired, ctrlCreateComments);
commentRouter.delete("/:id", authRequired, ctrlDeleteComment);
commentRouter.put("/:id", authRequired, ctrlUpdateComment);

export default commentRouter;