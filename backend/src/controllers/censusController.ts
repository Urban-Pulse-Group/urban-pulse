import { Request, Response } from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

export const getCensusData = asyncHandler(
  async (req: Request, res: Response) => {
    const { state, place } = req.query;

    const apiKey = process.env.CENSUS_API;
    if (!apiKey) {
      throw new Error("Census API key is missing");
    }
    console.log("Received state and place:", state, place);
    const url = `https://api.census.gov/data/2019/acs/acs5?get=B19013_001E,B01003_001E&for=place:${place}&in=state:${state}&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Census API");
    }

    const data = await response.json();
    console.log("Census data fetched from API:", data);
    res.json({ data });
  }
);
