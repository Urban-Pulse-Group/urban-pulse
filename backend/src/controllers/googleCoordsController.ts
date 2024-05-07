import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const getCoordinates = asyncHandler(
  async (req: Request, res: Response) => {
    const { state, county, tract, countyname } = req.query;

    const apiKey = process.env.GOOGLE_API as string;
    const address = `${tract}, ${county}, ${state}, ${countyname}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Geocoding API Error");
    }

    const data = await response.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      res.status(200).json({coordinates: [ lat, lng ] });
    } else {
      throw new Error("No results found from Google Maps Geocoding API");
    }
  }
);
