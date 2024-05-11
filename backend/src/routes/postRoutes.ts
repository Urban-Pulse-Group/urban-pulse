import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createPosts, getAllPosts, getPost, deletePost } from "../controllers/postControllers";


export const router: Router = express.Router();

router.post("/",protect,createPosts);
router.get("/", protect, getAllPosts);
router.get("/:id", protect,getPost );
router.delete("/:id", protect,deletePost );
export default router;
