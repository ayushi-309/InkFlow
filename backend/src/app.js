import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Health Check Route...
app.get("/", (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Server is running"
      )
    );
});

export { app };
