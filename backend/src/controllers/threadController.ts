import asyncHandler from "express-async-handler";

import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import { Threads } from "../models/Threads";
import express from "express";

/**
 * @desc creates a thread
 * @route  GET /api/thread
 * @access Private
 */
export const createThread = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, content, postId} = req.body;

    if (!userId || !content || !postId) {
      res.status(400);
      throw new Error("Missing 1 or more of the  required feilds");
    }
    const createdThread = await Threads.create(req.body);
    if (!createdThread) {
      res.status(500);
      throw new Error("Unable to create Thread");
    }
    res.status(201).json({
      message: "Thread created successfully",
      data: createdThread,
    });
  }
);

/**
 * @desc gets all threads that relate to a given Post id
 * @route  GET /api/thread/:postId
 * @access Private
 */
export const getThreadsOfPost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.body;
  const threads = await Threads.findByPost(postId);
  if (!threads) {
    res.status(404);
    throw new Error("No threads found for the given id");
  }
  res.json({ data: await Threads.findByPost(postId) });
});

/**
 * @desc gets a single post using id retrieved from url params
 * @route  GET /api/singleThread/:id
 * @access Private
 */
export const getThread = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
console.log("id:", id)
  const post = await Threads.findById(id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.json({ data: post });
});

/**
 * @desc deletes a single Thread using id retrieved frrom url params
 * @route   /api/thread/:id
 * @access Private
 */
export const deleteThread = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPost = await Threads.delete(id);
  if (!deletedPost) {
    res.status(404);
    throw new Error("Unable to delete: Thread not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deletedPost,
  });
});
