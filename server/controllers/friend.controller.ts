import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  acceptFriendRequest,
  addFriends,
  getFriends,
  getPendingFriendRequest,
  searchFriendsByUsername,
} from "../services/friend.service";

const friendController = () => {
  const router = Router();

  router.get("/", authMiddleware, getFriends);
  router.post("/", authMiddleware, addFriends);
  router.get("/pending", authMiddleware, getPendingFriendRequest);
  router.get("/search", authMiddleware, searchFriendsByUsername);
  router.post("/accept", authMiddleware, acceptFriendRequest);

  return router;
};

export default friendController;
