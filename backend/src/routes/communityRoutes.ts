import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createCommunity } from "../controllers/communityControllers";

const router = Router();

router.get("/createCommunity", protect, createCommunity);

export default router;
