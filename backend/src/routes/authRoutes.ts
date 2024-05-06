import express, { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/authControllers";

const router: Router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", getUser)


export default router 