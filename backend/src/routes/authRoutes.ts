import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,

  logoutUser,
} from "../controllers/authControllers";
import { protect } from "../middleware/authMiddleware";

const authRouter: Router = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/getUser", protect, getUser);
authRouter.get("/logout",logoutUser )

export default authRouter;
