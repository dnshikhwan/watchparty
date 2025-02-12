import { Router } from "express";
import {
  refreshToken,
  requestResetPassword,
  signIn,
  signOut,
  signUp,
  verifyResetToken,
} from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const authController = () => {
  const router = Router();

  router.post("/signup", signUp);
  router.post("/signin", signIn);
  router.get("/refresh", authMiddleware, refreshToken);
  router.get("/signout", authMiddleware, signOut);
  router.post("/request-reset-password", requestResetPassword);
  router.get("/reset-password/:token", verifyResetToken);

  return router;
};

export default authController;
