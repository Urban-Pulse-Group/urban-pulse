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
  const { userId, title, description, category } = req.body;

  if (!userId || !title || !description || !category) {
    res.status(400);
    throw new Error("User Id, Title, description, and category are required");
  }

  const { rows } = await db.raw(
    `
    INSERT INTO community ( user_id, title, description, category)
    VALUES (?, ?, ?, ?)
    RETURNING *
  `,
    [title, description, category]
  );

  res.status(201).json({
    message: "Community created successfully",
    data: rows[0],
  });
});

export const getAllCommunities = asyncHandler(async (req, res) => {
  const { rows } = await db.raw(`
     SELECT * FROM community     
   `);
  res.json({
    data: rows,
  });
});

export const getACommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.raw(
    `
    SELECT * FROM community
    WHERE id = ?
  `,
    [id]
  );
  res.json({
    success: true,
    data: rows,
  });
});

export const deleteACommunity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.raw(
    `
  DELETE FROM community
  WHERE id = ?
  `,
    [id]
  );
  res.json({
    success: true,
    message: "Deleted successfully!",
    data: rows,
  });
});
