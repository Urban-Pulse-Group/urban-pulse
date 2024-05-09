import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();

export default router;
