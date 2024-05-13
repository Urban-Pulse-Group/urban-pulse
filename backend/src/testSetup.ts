import { app } from "./app";
import { Server } from "http";
let server: Server | null = null;

export const startServer = (port: number = 0): Promise<Server> => {
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Server started on port 4040`);
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
