import express from "express";
const membershipRouter = express.Router();
import {
  leaveCommunity,
  isUserInCommunity,
  joinCommunity,
  getUserMemberships,
  getMembershipCount,
} from "../controllers/membershipController";
import { protect } from "../middleware/authMiddleware";

membershipRouter.post("/leave", leaveCommunity);
membershipRouter.get("/isMember", isUserInCommunity);
membershipRouter.post("/join", joinCommunity);
membershipRouter.get("/:userId", getUserMemberships);
membershipRouter.get("/count/:communityId", protect, getMembershipCount)
export default membershipRouter;
