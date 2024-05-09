import { Request } from "express";
import { User } from "./userTypes";


export interface ProtectedRequest extends Request {
  user?: User;
  token?: string
}
