import express, { Request, Response, Application, NextFunction } from "express";
import { Server } from "http";
import censusRouter from "./routes/censusRoutes";
import authRouter from "./routes/authRoutes";
import googleRouter from "./routes/googleCoords";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { logRequests } from "./middleware/loggingMiddleware";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust to match your frontend's URL
  credentials: true, // Enable cookies
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequests);

app.use(cookieParser());

app.use("/api/census", censusRouter);
app.use("/api/auth", authRouter);
app.use("/api/coordinates", googleRouter);
app.use("/api/census", censusRouter);
app.use(errorHandler);
const PORT: number | string = process.env.PORT ?? 4040;
const server: Server = app.listen(4040, () =>
  console.log(`server is on port ${PORT}`)
);
