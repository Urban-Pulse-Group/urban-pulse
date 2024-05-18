import { Request, Response } from 'express';
import { Memberships } from '../models/Memberships';
import { ProtectedRequest } from '../types/serverTypes';
import asyncHandler from 'express-async-handler';

/**
 * @desc Join a community
 * @route POST /api/membership/join
 * @access Private
 */
export const joinCommunity = asyncHandler(async (req: Request, res: Response) => {
  const { userId, communityId } = req.body;
  await Memberships.joinCommunity(userId, communityId);
  res.status(200).json({ message: 'Joined community successfully' });
});

/**
 * @desc Leave a community
 * @route POST /api/membership/leave
 * @access Private
 */
export const leaveCommunity = asyncHandler(async (req: Request, res: Response) => {
  const { userId, communityId } = req.body;
  await Memberships.leaveCommunity(userId, communityId);
  res.status(200).json({ message: 'Left community successfully' });
});

/**
 * @desc Check if a user has joined a community
 * @route GET /api/membership/isMember
 * @access Private
 */
export const isUserInCommunity = asyncHandler(async (req: Request, res: Response) => {
  const { userId, communityId } = req.query;
  const isMember = await Memberships.isUserInCommunity(userId as string, communityId as string);
  res.status(200).json({ isMember });
});

/**
 * @desc Get communities the user is a part of
 * @route GET /api/membership
 * @access Private
 */
export const getUserMemberships = asyncHandler(async (req: Request, res: Response) => {
  const {userId} = req.params
  
    const communities = await Memberships.getUserMemberships(userId);

    res.status(200).json({ data: communities });
  });