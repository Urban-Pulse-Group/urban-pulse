import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
  refreshAccessToken,
} from "../controllers/authControllers";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUser);
router.post("/logout", )
router.get("refreshAccessToken", refreshAccessToken);
export default router;
