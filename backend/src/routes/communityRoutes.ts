import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCommunity,
  deleteACommunity,
  getACommunity,
  getAllCommunities,
} from "../controllers/communityControllers";

const router = Router();

router.post("/createCommunity", protect, createCommunity);
router.get("/getCommunities", protect, getAllCommunities);
router.get("/getCommunity/:id", protect, getACommunity);
router.delete("/deleteCommunity/:id", protect, deleteACommunity);
export default router;
