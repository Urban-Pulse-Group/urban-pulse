import asyncHandler from "express-async-handler";

import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import { Replies } from "../models/Replies";
import express from "express";

/**
 * @desc creates a Reply
 * @route  POST /api/reply
 * @access Private
 */
export const createReply = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, content, threadId} = req.body;

    if (!userId || !content || !threadId) {
      res.status(400);
      throw new Error("Missing 1 or more of the  required feilds");
    }
    const createdThread = await Replies.create(req.body);
    if (!createdThread) {
      res.status(500);
      throw new Error("Unable to create Reply");
    }
    res.status(201).json({
      message: "Reply created successfully",
      data: createdThread,
    });
  }
);

/**
 * @desc gets all replies that relate to a given Thread Id
 * @route  GET /api/reply/:postId
 * @access Private
 */
export const getRepliesOfThread = asyncHandler(async (req: Request, res: Response) => {
  const { threadId } = req.body;
  const replies = await Replies.findByThread(threadId);
  if (!replies) {
    res.status(404);
    throw new Error("No replies found for the given thread id");
  }
  res.json({ data: replies});
});

/**
 * @desc gets a single reply using id retrieved from url params
 * @route  GET /api/singleReply/:id
 * @access Private
 */
export const getReply = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
console.log("id:", id)
  const reply = await Replies.findById(id);
    if (!reply) {
    res.status(404);
    throw new Error("Reply not found");
  }
  res.json({ data: reply });
});

/**
 * @desc deletes a single Thread using id retrieved frrom url params
 * @route   DELETE /api/reply/:id
 * @access Private
 */
export const deleteReply = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedReply = await Replies.delete(id);
  if (!deletedReply) {
    res.status(404);
    throw new Error("Unable to delete: Reply not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deletedReply,
  });
});
