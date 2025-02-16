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
    const user = req.user as User;

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
        id: {
          not: user.id,
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
        OR: [{ user_id: user.id }, { friend_id: user.id }],
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
        user: {
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
        user: {
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

    const updatedFriends = await prisma.friend.updateManyAndReturn({
      where: {
        user_id: Number(friend_id),
        status: "pending",
        friend_id: user.id,
      },
      data: {
        status: "accepted",
      },
    });

    if (updatedFriends.length === 0) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.unexpectedError
      );
    }

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

// unfollow friend
export const unfollowFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { friend_id } = req.body;

    await prisma.friend.deleteMany({
      where: {
        OR: [
          { user_id: user.id },
          { friend_id: user.id },
          { user_id: friend_id },
          { friend_id: friend_id },
        ],
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.unfriendSuccessful
    );
  } catch (err) {
    next(err);
  }
};
