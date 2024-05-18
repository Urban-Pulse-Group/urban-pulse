import express from "express"
const membershipRouter = express.Router();
import { leaveCommunity, isUserInCommunity, joinCommunity, getUserMemberships } from "../controllers/membershipController";

membershipRouter.post('/leave', leaveCommunity);
membershipRouter.get('/isMember', isUserInCommunity);
membershipRouter.post("/join", joinCommunity)
membershipRouter.get("/:userId", getUserMemberships)
export default membershipRouter;

