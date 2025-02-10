import { Router } from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const authController = () => {
  const router = Router();

  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.get("/refresh", authMiddleware, refreshToken);
  router.get("/signout", authMiddleware, signOut);

  return router;
};

export default authController;
