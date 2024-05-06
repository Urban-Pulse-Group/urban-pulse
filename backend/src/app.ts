import express, { Request, Response, Application, NextFunction } from "express";
import { Server } from "http";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 4040;

app.get("/", (req: Request, res: Response) => {
  console.log("hi");
});


app.use((req: Request, res: Response, next: NextFunction) => {
    
})
const server: Server = app.listen(4040, () =>
  console.log(`server is on port ${PORT}`)
);
