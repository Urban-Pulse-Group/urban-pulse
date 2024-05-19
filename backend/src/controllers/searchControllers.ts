import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Search from '../models/Search';

export const searchCommunities = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.query;

  if (!title) {
    res.status(400);
    throw new Error("Title query parameter is required");
  }

  const communities = await Search.searchCommunities(title as string);
  res.json(communities);
});

export const searchPosts = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error("Query parameter is required");
  }

  const posts = await Search.searchPosts(query as string);
  res.json(posts);
});
