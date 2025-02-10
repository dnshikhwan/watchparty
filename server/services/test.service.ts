import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { HTTP_RESPONSE_CODE } from "../constants";

export const checkHealth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, "ok", {
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
