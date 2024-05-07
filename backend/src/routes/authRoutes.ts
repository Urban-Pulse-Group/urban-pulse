import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/authControllers";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUser);

export default router;
