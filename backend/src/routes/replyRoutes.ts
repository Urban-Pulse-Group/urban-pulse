import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createReply,getReply, getRepliesOfThread,deleteReply } from "../controllers/replyControllers";


export const replyRouter: Router = express.Router();

replyRouter.post("/",protect, createReply);
replyRouter.get("/singleReply/:id", protect, getReply);
replyRouter.get("/:replyId", protect, getRepliesOfThread);
replyRouter.delete("/:id", protect, deleteReply);
export default replyRouter;
