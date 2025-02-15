import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createRoom, getRooms } from "../services/room.service";

const roomController = () => {
  const router = Router();

  router.post("/", authMiddleware, createRoom);
  router.get("/", authMiddleware, getRooms);

  return router;
};

export default roomController;
