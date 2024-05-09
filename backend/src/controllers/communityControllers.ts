import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
export const createCommunity = async (req: Request, res: Response) => {
  const { title, description, category } = req.body;

  try {
    const newCommunity = await db("community")
      .insert({
        title,
        description,
        category,
      })
      .returning("*");

    res.status(201).json({
      success: true,
      data: newCommunity[0],
    });
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
