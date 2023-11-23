import express from "express";
import cors from "cors";
import responseHandler from "./tools/apiResponseHandler";
import { Response, Request } from "express";
import logger from "./middlewares/logger";
import authenticateKey from "./middlewares/authentication";
import userRoutes from "./routes/userRoutes";
import logRoutes from "./routes/logRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";
import { listen } from "./config/consumer";
import apiKeyValidationRoutes from "./routes/apiKeyValidationRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/users", authenticateKey, userRoutes);
app.use("/logs", logRoutes);
app.use("/validate-api-key", apiKeyValidationRoutes);
app.all("*", function (req: Request, res: Response) {
	return responseHandler.notFoundResponse(res, "Page not found");
});

listen();

export default app;
