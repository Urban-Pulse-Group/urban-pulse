import express from "express";
import { getCensusData } from "../controllers/censusController";

const cencusRouter = express.Router();

cencusRouter.get("/census-data", getCensusData);

export default cencusRouter;
