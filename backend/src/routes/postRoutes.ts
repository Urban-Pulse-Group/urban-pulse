import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createPosts, getAllPosts, getPost, deletePost } from "../controllers/postControllers";



export const communityRouter: Router= express.Router();

communityRouter.post("/",protect,createPosts);
communityRouter.get("/", protect, getAllPosts);
communityRouter.get("/:id", protect, getPost );
communityRouter.delete("/:id", protect, deletePost );
export default communityRouter;
