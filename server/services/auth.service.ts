import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import prisma from "../prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.userSignedUp,
      {
        data: newUser,
      }
    );
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return sendResponse(
          res,
          false,
          HTTP_RESPONSE_CODE.CONFLICT,
          APP_MESSAGE.duplicatedUser
        );
      }
    }
    next(err);
  }
};
