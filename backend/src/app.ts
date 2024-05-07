import express, { Request, Response, Application, NextFunction } from "express";
import { Server } from "http";
import censusRouter from "./routes/censusRoutes";
import authRouter from "./routes/authRoutes";
import googleRouter from "./routes/googleCoords";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/census", censusRouter);

app.use("/api/coordinates", googleRouter);

app.use("/api/census", censusRouter);

const PORT: number | string = process.env.PORT ?? 4040;
const server: Server = app.listen(4040, () =>
  console.log(`server is on port ${PORT}`)
);
