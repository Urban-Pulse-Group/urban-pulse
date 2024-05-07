import express from "express";
import { getCoordinates } from "../controllers/googleCoordsController";


const router = express.Router();

router.get("/", getCoordinates)

export default router;