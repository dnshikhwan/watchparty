import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import prisma from "../prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { configs, cookieOptions } from "../configs";
import { ResetToken, User } from "@prisma/client";
import sendMail from "../helpers/sendMail.helper";

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

// request reset password
export const requestResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
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

    if (user) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email: user.email,
        },
        configs.JWT_SECRET,
        {
          expiresIn: "10m",
        }
      );

      const hashedToken = await argon2.hash(token);

      await prisma.resetToken.create({
        data: {
          user_id: user.id,
          token: hashedToken,
        },
      });

      // send email to the user
      sendMail(
        user,
        "Reset password link",
        `${process.env.FRONTEND_URL}/auth/reset-password/${token}`
      );
    }

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.resetEmailSent
    );
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return sendResponse(
          res,
          true,
          HTTP_RESPONSE_CODE.OK,
          APP_MESSAGE.resetEmailSent
        );
      }
      if (err.code === "P2002") {
        return sendResponse(
          res,
          false,
          HTTP_RESPONSE_CODE.CONFLICT,
          APP_MESSAGE.resetEmailAlreadySent
        );
      }
    }
    next(err);
  }
};

// verify reset token
export const verifyResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, configs.JWT_SECRET) as ResetToken;

    const resetToken = await prisma.resetToken.findUnique({
      where: {
        user_id: decoded.user_id,
      },
    });

    if (!resetToken) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.userNotFound
      );
    }

    const checkToken = await argon2.verify(resetToken.token, token);

    if (!checkToken) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_MESSAGE.invalidToken
      );
    }

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.tokenValidated,
      {
        data: {
          user_id: decoded.user_id,
        },
      }
    );
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_MESSAGE.invalidToken
      );
    }

    next(err);
  }
};

// reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.passwordResetted
    );
  } catch (err) {
    next(err);
  }
};
