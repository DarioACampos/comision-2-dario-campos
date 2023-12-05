import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRouter.js";

const app = express();

app.use(express.json()); 
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

export default app;
