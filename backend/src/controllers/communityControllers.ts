import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";



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

  const { rows } = await db.raw(
    `
    INSERT INTO communities ( user_id, title, description, category)
    VALUES (?, ?, ?, ?)
    RETURNING *
  `,
    [userId, title, description, category]
  );

  res.status(201).json({
    message: "Community created successfully",
    data: rows[0],
  });
});


/**
 * @desc gets all Communities
 * @route  GET /api/community
 * @access Private
 */
export const getAllCommunities = asyncHandler(async (req, res) => {
  const { rows } = await db.raw(`
     SELECT * FROM communities     
   `);
  res.json({
    data: rows,
  });
});



/**
 * @desc gets a single community using id retrieved frrom url params
 * @route  GET /api/community/:id
 * @access Private
 */
export const getCommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.raw(
    `
    SELECT * FROM communities
    WHERE id = ?
  `,
    [id]
  );

  const communityExists = rows.length > 0;
  if (!communityExists) {
    res.status(404);
    throw new Error("Unable to find row");
  }
  res.json({
    data: rows[0],
  });
});


/**
 * @desc gets a single community using id retrieved frrom url params
 * @route  DELETE /api/community/:id
 * @access Private
 */
export const deleteCommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.raw(
    `
  DELETE FROM communities
  WHERE id = ?
  `,
    [id]
  );

  res.json({
    message: "Deleted successfully!",
    data: rows,
  });
});
