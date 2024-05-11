import express, { Router }  from "express";
import { protect } from "../middleware/authMiddleware";

import {
  createCommunity,
  deleteCommunity,
  getCommunity,
  getAllCommunities,
} from "../controllers/communityControllers";

const communityRouter: Router = express.Router();

communityRouter.post("/",  createCommunity);
communityRouter.get("/", protect, getAllCommunities);
communityRouter.get("/:id", protect, getCommunity);
communityRouter.delete("/:id", protect, deleteCommunity);
export default communityRouter;
