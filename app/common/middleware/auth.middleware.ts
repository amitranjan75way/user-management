import { type Request, type Response, type NextFunction } from "express";
import createHttpError from "http-errors";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { loadConfig } from "../helper/config.hepler";
import { Payload } from "../dto/base.dto";
import { createResponse } from "../helper/response.hepler";
import { validateToken } from "../helper/jwt.helper";

loadConfig();
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
// todo : make this function fully functional 
export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token || token === undefined) {
      throw createHttpError(401, "Auth: token is missing");
    }

    const { valid, decoded } = validateToken(token, ACCESS_TOKEN_SECRET);
    // req.user = decoded as Payload;
    console.log(decoded);
    res.send(createResponse(decoded, "user verified successfully"));
  }
);
