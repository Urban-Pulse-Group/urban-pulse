import { Request } from "express";
import { UserData } from "./userTypes";

export interface ProtectedRequest extends Request {
  user?: UserData;
}
