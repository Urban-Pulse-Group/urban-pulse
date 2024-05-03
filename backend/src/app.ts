import express, { Request, Response, Application, NextFunction } from "express";
import { Server } from "http";
import censusRouter from "./routes/censusRoutes";
import cors from "cors";

const app: Application = express();

app.use(cors());
const PORT = process.env.PORT ?? 4040;

app.get("/", (req: Request, res: Response) => {
  console.log("hi");
});

app.use(express.json());
app.use("/api/census", censusRouter);

app.use((req: Request, res: Response, next: NextFunction) => {});
const server: Server = app.listen(4040, () =>
  console.log(`server is on port ${PORT}`)
);
