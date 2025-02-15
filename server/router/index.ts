import { Router } from "express";
import { testController } from "../controllers/test.controller";
import authController from "../controllers/auth.controller";
import roomController from "../controllers/room.controller";
import friendController from "../controllers/friend.controller";

export const createRouter = () => {
  const router = Router();

  router.use("/test", testController());
  router.use("/auth", authController());
  router.use("/rooms", roomController());
  router.use("/friends", friendController());

  return router;
};
