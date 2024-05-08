import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,

  logoutUser,
} from "../controllers/authControllers";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUser);
router.get("/logout",logoutUser )

export default router;
