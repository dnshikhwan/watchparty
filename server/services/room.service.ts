import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { APP_MESSAGE, HTTP_RESPONSE_CODE } from "../constants";
import prisma from "../prisma/prisma";
import { User } from "@prisma/client";

// create room
export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, videoUrl } = req.body;
    const user = req.user as User;

    if (!name || !description || !videoUrl) {
      return sendResponse(
        res,
        false,
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_MESSAGE.missingRequiredFields
      );
    }

    const newRoom = await prisma.room.create({
      data: {
        name,
        description,
        video_url: videoUrl,
        owner_id: user.id,
      },
    });

    return sendResponse(
      res,
      true,
      HTTP_RESPONSE_CODE.CREATED,
      APP_MESSAGE.roomCreated,
      {
        data: {
          room: newRoom,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

// update room

// get rooms
export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await prisma.room.findMany();

    return sendResponse(
      res,
      false,
      HTTP_RESPONSE_CODE.OK,
      APP_MESSAGE.success,
      {
        data: {
          rooms,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

// delete rooms
