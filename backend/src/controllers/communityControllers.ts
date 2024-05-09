import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import { Communities } from "../models/Community";

/**
 * @desc creates a community
 * @route  GET /api/community
 * @access Private
 */
export const createCommunity = asyncHandler(async (req, res) => {
  const { userId, title, description, category } = req.body;

  if (!userId || !title || !description || !category) {
    res.status(400);
    throw new Error("User Id, Title, description, and category are required");
  }
  const createdCommunity = await Communities.create(req.body);
  if (!createCommunity) {
    res.status(500);
    throw new Error("Unable to create community");
  }
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
export const getAllCommunities = asyncHandler(async (req, res) => {
  res.json({ data: await Communities.findAll() });
});

/**
 * @desc gets a single community using id retrieved frrom url params
 * @route  GET /api/community/:id
 * @access Private
 */
export const getCommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const community = await Communities.find(id);
  if (!community) {
    res.status(404);
    throw new Error("Community not found");
  }
  res.json({ data: community });
});

/**
 * @desc gets a single community using id retrieved frrom url params
 * @route   /api/community/:id
 * @access Private
 */
export const deleteCommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCommunity = await Communities.delete(id);
  if (!deleteCommunity) {
    res.status(404);
    throw new Error("Unable to delete: Community not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deleteCommunity,
  });
});
