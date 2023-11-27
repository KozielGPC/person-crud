import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { logger } from "../middlewares/logger";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/auth/validate", logger, authController.validate);

export { authRoutes };
