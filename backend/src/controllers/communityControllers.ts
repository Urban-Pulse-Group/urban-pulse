import asyncHandler from "express-async-handler";
import db from "../db/db";
import { ProtectedRequest } from "../types/serverTypes";
import { Response, Request } from "express";

const createCommunity = asyncHandler;
