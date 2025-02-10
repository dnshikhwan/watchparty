import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import prisma from "../prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { configs, cookieOptions } from "../configs";
import { User } from "@prisma/client";

// sign up
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

// sign in
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const decodedPassword: Boolean = await argon2.verify(
      user.password,
      password
    );

    if (!decodedPassword) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.invalidCredentials
      );
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.userSignedIn,
      {
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken,
        },
      }
    );
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return sendResponse(
          res,
          false,
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_MESSAGE.invalidCredentials
        );
      }
    }
    next(err);
  }
};

// sign out
export const signOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.userSignedOut
    );
  } catch (err) {
    next(err);
  }
};

// refresh token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_MESSAGE.noRefreshToken
      );
    }

    const user = jwt.verify(refreshToken, configs.JWT_SECRET) as User;

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("token", newAccessToken, cookieOptions);
    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.newTokenCreated
    );
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.FORBIDDEN,
        APP_MESSAGE.invalidRefrehToken
      );
    }
    next(err);
  }
};
