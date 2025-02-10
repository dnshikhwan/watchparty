import { Router } from "express";
import { testController } from "../controllers/test.controller";
import authController from "../controllers/auth.controller";

export const createRouter = () => {
  const router = Router();

  router.use("/test", testController());
  router.use("/auth", authController());

  return router;
};
