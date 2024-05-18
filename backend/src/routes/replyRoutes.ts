import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createReply,getReply, getRepliesOfThread,deleteReply, putLikes } from "../controllers/replyControllers";


export const replyRouter: Router = express.Router();

replyRouter.post("/",protect, createReply);
replyRouter.get("/singleReply/:id", protect, getReply);
replyRouter.get("/:threadId", protect, getRepliesOfThread);
replyRouter.delete("/:id", protect, deleteReply);
replyRouter.put("/:id/likes", protect, putLikes);
export default replyRouter;
