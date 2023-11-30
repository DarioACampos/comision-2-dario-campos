import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
// import {indexRoutes} from "../src/routes/index.routes.js"
// import authRouter from "../src/routes/auth.routes.js";

const app = express();

app.use(express.json()); 
app.use(helmet());
app.use(morgan("dev"));
// app.use("/", indexRoutes);
// app.use("/api", authRouter);
app.use(cookieParser);
app.use(cors());

// app.use("/", (req, res) => {
//     res.send("gil")
// })
export default app;