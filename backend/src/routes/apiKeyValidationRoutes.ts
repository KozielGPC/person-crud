import { Router } from "express";
import { ApiKeyValidationController } from "../controllers/apiKeyValidationController";

const apiKeyValidationRoutes = Router();

const apiKeyValidationController = new ApiKeyValidationController();

apiKeyValidationRoutes.get("/", apiKeyValidationController.validate);
export default apiKeyValidationRoutes;
