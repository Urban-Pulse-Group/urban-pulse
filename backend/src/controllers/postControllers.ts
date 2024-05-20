import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Posts } from "../models/Posts";

/**
 * @desc creates a post
 * @route  POST /api/post
 * @access Private
 */
export const createPosts = asyncHandler(async (req: Request, res: Response) => {
  const { userId, title, content, communityId, img } = req.body;

  if (!userId || !title || !content || !communityId) {
    res.status(400);
    throw new Error("Missing 1 or more required feilds");
  }
  const createdPost = await Posts.create(req.body);
  if (!createdPost) {
    res.status(500);
    throw new Error("Unable to create post");
  }
  res.status(201).json({
    message: "Post created successfully",
    data: createdPost,
  });
});

/**
 * @desc gets all posts
 * @route  GET /api/post
 * @access Private
 */
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  res.json({ data: await Posts.findAll() });
});

/**
 * @desc gets a single post using community id retrieved from url params
 * @route  GET /api/post/:id
 * @access Private
 */
export const getPostByCommunity = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Posts.findByCommunityId(id);
    if (!post) {
      res.status(404);
      throw new Error("Posts not found");
    }
    res.json({ data: post });
  }
);

/**
 * @desc gets a single post using  post id retrieved frrom url params
 * @route  GET /api/post/:id
 * @access Private
 */
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Posts.findById(id);
  if (!post) {
    res.status(404);
    throw new Error("Posts not found");
  }
  res.json({ data: post });
});

/**
 * @desc deletes a single Post using id retrieved frrom url params
 * @route   DELETE /api/post/:id
 * @access Private
 */
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPost = await Posts.delete(id);
  if (!deletedPost) {
    res.status(404);
    throw new Error("Unable to delete: Post not found");
  }
  res.json({
    message: "Deleted successfully!",
    data: deletedPost,
  });
});

/**
 * @desc    Updates the likes of a single Post using id retrieved from URL params
 * @route   PUT /api/post/:id/likes
 * @access  Private
 */
export const putLikes = asyncHandler(async (req: Request, res: Response) => {
  const { likes } = req.body;
  const { id } = req.params;
  if (typeof likes !== "number" || likes < 0) {
    res.status(400);
    throw new Error("Invalid likes count");
  }
  const update = await Posts.updateLikes(id, likes);
  res.json({
    message: "successfully updated likes",
  });
});

/**
 * @desc    Gets random posts
 * @route   GET /api/post/random/:limit
 * @access  Private
 */
export const getRandomPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const posts = await Posts.getRandomPosts();
    res.json({ data: posts });
  }
);

/**
 * @desc Gets the most popular posts
 * @route GET /api/post/random/:limit
 * @access Public
 */
export const getMostPopularPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;
    const posts = await Posts.getMostPopularPosts(limit);
    res.json({ data: posts });
  }
);
