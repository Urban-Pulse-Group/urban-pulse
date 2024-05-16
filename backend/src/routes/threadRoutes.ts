import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createThread, getThread, getThreadsOfPost, deleteThread, putLikes } from "../controllers/threadController";



export const threadRouter: Router = express.Router();

threadRouter.post("/",protect, createThread);
threadRouter.get("/singleThread/:id", protect, getThread);
threadRouter.get("/:postId", protect, getThreadsOfPost );
threadRouter.delete("/:id", protect, deleteThread);
threadRouter.put("/:id/likes", protect, putLikes);
export default threadRouter;
