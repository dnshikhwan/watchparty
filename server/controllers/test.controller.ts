import { NextFunction, Request, Response, Router } from "express";
import { checkHealth } from "../services/test.service";
import { authMiddleware } from "../middlewares/auth.middleware";

export const testController = () => {
  const router = Router();

  router.get("/health", authMiddleware, checkHealth);

  return router;
};
