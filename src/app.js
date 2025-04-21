import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Router imports
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/auth", userRouter);

export default app;
