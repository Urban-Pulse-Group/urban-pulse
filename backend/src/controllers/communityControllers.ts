import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Request, Response } from "express";
import knex from "knex";
// export const createCommunity = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { user_id, title, description, category } = req.body;

//     const { rows } = await knex.raw(`
//     INSERT INTO community (user_id ,title, description, category)
//     VALUES (?, ?, ?, ?)
//     RETURN *

//     `);
//     // const newCommunity = await db("community")
//     //   .insert({
//     //     title,
//     //     description,
//     //     category,
//     //   })
//     // .returning("*");
//     res.status(201).json({
//       success: true,
//       data: newCommunity[0],
//     });
//   }
// );

export const createCommunity = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error("Title, description, and category are required");
  }

  const { rows } = await db.raw(
    `
    INSERT INTO community (title, description, category)
    VALUES (?, ?, ?)
    RETURNING *
  `,
    [title, description, category]
  );

  res.status(201).json({
    success: true,
    message: "Community created successfully",
    data: rows[0],
  });
});
