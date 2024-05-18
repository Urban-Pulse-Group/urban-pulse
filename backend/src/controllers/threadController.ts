import asyncHandler from "express-async-handler";

import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import { Threads } from "../models/Threads";
import express from "express";

/**
 * @desc creates a thread
 * @route  POST /api/thread
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
  const { postId } = req.params;
  const threads = await Threads.findByPost(postId);
  if (!threads) {
    res.status(404);
    throw new Error("No threads found for the given id");
  }
  res.json({ data: threads});
});

/**
 * @desc gets a single Thread using id retrieved from url params
 * @route  GET /api/singleThread/:id
 * @access Private
 */
export const getThread = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
console.log("id:", id)
  const thread = await Threads.findById(id);
  if (!thread) {
    res.status(404);
    throw new Error("Thread not found");
  }
  res.json({ data: thread });
});

/**
 * @desc deletes a single Thread using id retrieved from url params
 * @route   DELETE /api/thread/:id
 * @access Private
 */
export const deleteThread = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedThread = await Threads.delete(id);
  if (!deletedThread) {
    res.status(404);
    throw new Error("Unable to delete: Thread not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deletedThread,
  });
});


/**
 * @desc    Updates the likes of a single thread using id retrieved from URL params
 * @route   PUT /api/thread/:id/likes
 * @access  Private
 */
export const putLikes = asyncHandler(async (req: Request, res: Response) => {
  const {likes} = req.body;
const { id } = req.params;
if (typeof likes !== 'number' || likes < 0) {
  res.status(400);
  throw new Error('Invalid likes count');
}
const update = await Threads.updateLikes(id, likes);
res.json({
  message: "successfully updated likes"
})


})
