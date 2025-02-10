import { Router } from "express";
import { signUp } from "../services/auth.service";

const authController = () => {
  const router = Router();

  router.post("/signup", signUp);

  return router;
};

export default authController;
