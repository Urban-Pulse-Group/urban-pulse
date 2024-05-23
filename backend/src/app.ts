import express, { Request, Response, Application, NextFunction } from "express";
import { Server } from "http";
import censusRouter from "./routes/censusRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { logRequests } from "./middleware/loggingMiddleware";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes";
import communityRouter from "./routes/communityRoutes";
import threadRouter from "./routes/threadRoutes";
import replyRouter from "./routes/replyRoutes";
import membershipRouter from "./routes/membershipRoute";
import searchRouter from './routes/searchRoutes';
import path from 'path';

dotenv.config();


export const app: Application = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequests);

app.use("/api/auth", authRouter);
app.use("/api/census", censusRouter);
app.use("/api/community", communityRouter);
app.use("/api/post", postRouter);
app.use("/api/thread", threadRouter)
app.use("/api/reply", replyRouter)
app.use("/api/membership", membershipRouter)
app.use(errorHandler);
app.use('/api/search', searchRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT: number | string = process.env.PORT ?? 4040;
const server: Server = app.listen(PORT, () =>
  console.log(`server is on port ${PORT}`)
);
