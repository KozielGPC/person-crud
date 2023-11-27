import { Router } from "express";
import { LogController } from "../controllers/logController";
import { authenticateKey } from "../middlewares/authentication";

const logRoutes = Router();

const logController = new LogController();

/**
 * @swagger
 * /logs:
 *   get:
 *     tags: [Logs]
 *     summary: Get system logs
 *     description: Get system logs
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs found.
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               requestTime: "1990-01-01T00:00:00.000Z"
 *               responseTime: "1990-01-01T00:00:00.000Z"
 *               method: GET
 *               url: /logs
 *               statusCode: 200
 *               userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
 *               body: {}
 *               params: {}
 *               query: {}
 */
logRoutes.get("/logs", authenticateKey, logController.findMany);
export { logRoutes };
