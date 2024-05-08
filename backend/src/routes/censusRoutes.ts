import express from "express";
import { getCensusData } from "../controllers/censusController";

const router = express.Router();

router.get("/census-data", getCensusData);

export default router;
