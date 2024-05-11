import express, { Router }  from "express";
import { protect } from "../middleware/authMiddleware";

import {
  createCommunity,
  deleteCommunity,
  getCommunity,
  getAllCommunities,
} from "../controllers/communityControllers";

const router: Router = express.Router();

router.post("/",  createCommunity);
router.get("/", protect, getAllCommunities);
router.get("/:id", protect, getCommunity);
router.delete("/:id", protect, deleteCommunity);
export default router;
