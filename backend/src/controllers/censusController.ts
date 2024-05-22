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
  const url = `https://api.census.gov/data/2019/acs/acs5?get=B19013_001E,B01001_001E,B01001_002E,B01001_026E,B01002_002E,B01002_003E,B02001_002E,B02001_003E,B02001_004E,B02001_005E,B02001_006E,B15003_017E,B15003_022E,B15003_023E,B15002_007E,B15002_008E,B23025_002E,B23025_005E,B23025_006E,B25077_001E,B25064_001E,B25002_003E,B27001_001E,B27001_002E,B27001_003E,B17001_001E,B17001_002E,B08301_001E,B08301_002E,B08301_010E,B05002_001E,B05002_013E&for=place:${place}&in=state:${state}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch data from Census API. Status: ${response.status}`);
      console.log( await response.text())
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
