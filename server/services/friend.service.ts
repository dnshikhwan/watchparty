import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import prisma from "../prisma/prisma";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const searchFriendsByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (users.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.userNotFound,
        {
          data: {
            users,
          },
        }
      );
    }

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

// get friends
export const getFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;

    const friends = await prisma.friend.findMany({
      where: {
        user_id: user.id,
        status: "accepted",
      },
      include: {
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        friends,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getPendingFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;

    const pendingRequest = await prisma.friend.findMany({
      where: {
        friend_id: user.id,
        status: "pending",
      },
      include: {
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return sendResponse(res, true, HTTP_RESPONSE_CODE.OK, APP_MESSAGE.success, {
      data: {
        pendingRequest,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const addFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { friend_id } = req.body;
    const user = req.user as User;

    if (!friend_id) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    const checkFriend = await prisma.user.findFirst({
      where: {
        id: Number(friend_id),
      },
    });

    if (!checkFriend) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.NOT_FOUND,
        APP_MESSAGE.userNotFound
      );
    }

    const newFriend = await prisma.friend.create({
      data: {
        user_id: user.id,
        friend_id: Number(friend_id),
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.friendRequestSent,
      {
        data: {
          newFriend,
        },
      }
    );
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.unexpectedError
      );
    }
    next(err);
  }
};

export const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { friend_id } = req.body;

    if (!friend_id) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    await prisma.friend.updateMany({
      where: {
        user_id: user.id,
        status: "pending",
        friend_id: Number(friend_id),
      },
      data: {
        status: "accepted",
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.friendAccepted
    );
  } catch (err) {
    next(err);
  }
};
