import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { logger } from "../middlewares/logger";

const authRoutes = Router();

const authController = new AuthController();

/**
 * @swagger
 * /auth/validate:
 *   post:
 *     tags: [Authentication]
 *     summary: Validate API Key
 *     description: Validate an API Key and generate a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             apiKey: "your_api_key_here"
 *           schema:
 *             type: object
 *             properties:
 *               apiKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: API Key validation successful.
 *         content:
 *           application/json:
 *             example:
 *               message: "API KEY validation successful"
 *               data:
 *                 isValid: true
 *                 token: "generated_token_here"
 *       500:
 *         description: Internal server error during API Key validation.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error validating API KEY"
 *               error: "Internal Server Error"
 */
authRoutes.post("/auth/validate", logger, authController.validate);

export { authRoutes };
