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
dotenv.config();

export const testApp: Application = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
testApp.use(cookieParser());
testApp.use(cors(corsOptions));
testApp.use(express.json());
testApp.use(logRequests);

testApp.use("/api/auth", authRouter);
testApp.use("/api/census", censusRouter);
testApp.use("/api/community", communityRouter);
testApp.use("/api/post", postRouter);
testApp.use("/api/thread", threadRouter)
testApp.use("/api/reply", replyRouter)

testApp.use(errorHandler);
const PORT: number | string = process.env.PORT ?? 4040;
// const server: Server = testApp.listen(4040, () =>
//   console.log(`server is on port ${PORT}`)
// );
let server: Server | null = null;
export const startServer = (port: number = 0): Promise<Server> => {
  return new Promise((resolve, reject) => {
    server = testApp
      .listen(port, () => {
        console.log(`Server started on port ${port}`);
        resolve(server as Server);
      })
      .on("error", (err: Error) => {
        console.log("Error starting server:", err);
        reject(err);
      });
  });
};

export const closeServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          console.log("Error closing server:", err);
          reject(err);
          return;
        }
        console.log("Server closed");
        resolve();
      });
    } else {
      resolve();
    }
  });
};

