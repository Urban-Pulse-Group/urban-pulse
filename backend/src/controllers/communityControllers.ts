import asyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { Communities } from "../models/Communities";

/**
 * @desc creates a community
 * @route  DELETE /api/community
 * @access Private
 */
export const createCommunity = asyncHandler(async (req, res) => {
  const { userId, title, description, category } = req.body;

  if (!userId || !title || !description || !category) {
    res.status(400);
    throw new Error("Missing 1 or more of the required fields");
  }
  const createdCommunity = await Communities.create(req.body);
  res.status(201).json({
    message: "Community created successfully",
    data: createdCommunity,
  });
});

/**
 * @desc gets all Communities
 * @route  GET /api/community
 * @access Private
 */
export const getAllCommunities = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await Communities.findAll() });
});

/**
 * @desc gets a single community using id retrieved frrom url params
 * @route  GET /api/community/:id
 * @access Private
 */
export const getCommunity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const community = await Communities.findById(id);
  if (!community) {
    res.status(404);
    throw new Error("Community not found");
  }
  res.json({ data: community });
});

/**
 * @desc gets a single community using id retrieved frrom url params
 * @route   DELETE /api/community/:id
 * @access Private
 */
export const deleteCommunity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCommunity = await Communities.delete(id);
  if (!deletedCommunity) {
    res.status(404);
    throw new Error("Unable to delete: Community not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deleteCommunity,
  });
});
