import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createPosts,
  getAllPosts,
  getPostById,
  deletePost,
  putLikes,
  getPostByCommunity,
} from "../controllers/postControllers";

export const postRouter: Router = express.Router();

postRouter.post("/", protect, createPosts);
postRouter.get("/", protect, getAllPosts);
postRouter.get("/:id", protect, getPostByCommunity);
postRouter.delete("/:id", protect, deletePost);
postRouter.put("/:id/likes", protect, putLikes);
postRouter.get("/byId/:id", protect, getPostById);
export default postRouter;
