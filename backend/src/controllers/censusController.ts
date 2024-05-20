import { Request, Response } from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";




export const getCensusData = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { state, place } = req.query;

  if (!state || !place) {
    return res.status(400).json({ error: "State and place are required" });
  }

  const apiKey = process.env.CENSUS_API;
  console.log("api:", apiKey)
  if (!apiKey) {
    return res.status(500).json({ error: "Census API key is missing" });
  }

  console.log("Received state and place:", state, place);
  const url = `https://api.census.gov/data/2019/acs/acs5?get=B19013_001E,B01003_001E,B01001_002E,B01001_026E,B01002_002E,B01002_003E&for=place:${place}&in=state:${state}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch data from Census API. Status: ${response.status}`);
      return res.status(response.status).json({ error: "Failed to fetch data from Census API" });
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log("Census data fetched from API:", data);
      res.json({ data });
    } else {
      const text = await response.text();
      console.error("Received HTML response:", text);
      res.status(500).json({ error: "Unexpected response format from Census API" });
    }
  } catch (error) {
    console.error("Error fetching data from Census API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
