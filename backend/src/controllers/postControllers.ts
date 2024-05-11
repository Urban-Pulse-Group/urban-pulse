import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import { Posts } from "../models/Posts";
import express from "express";


/**
 * @desc creates a post
 * @route  GET /api/post
 * @access Private
 */
export const createPosts = asyncHandler(async (req, res) => {
    const { userId, title, content, community_id} = req.body;
  
    if (!userId || !title || !content || !community_id) {
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
  export const getAllPosts = asyncHandler(async (req, res) => {
    res.json({ data: await Posts.findAll() });
  });
  
  /**
   * @desc gets a single post using id retrieved frrom url params
   * @route  GET /api/post/:id
   * @access Private
   */
  export const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Posts.findById(id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    res.json({ data: post });
  });
  
  /**
   * @desc gets a single Post using id retrieved frrom url params
   * @route   /api/post/:id
   * @access Private
   */
  export const deletePost = asyncHandler(async (req, res) => {
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
  