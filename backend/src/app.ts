import express from "express";
import cors from "cors";
import { responseHandler } from "./tools/apiResponseHandler";
import { Response, Request } from "express";
import { userRoutes } from "./routes/userRoutes";
import { logRoutes } from "./routes/logRoutes";
import swaggerUi from "swagger-ui-express";
import { specs as swaggerSpecs } from "./swagger";
import { authRoutes } from "./routes/authRoutes";
import { listen } from "./services/rabbitmq/consumer";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(userRoutes);
app.use(logRoutes);
app.use(authRoutes);
app.all("*", function (req: Request, res: Response) {
	return responseHandler.notFoundResponse(res, "Page not found");
});

listen();

export { app };
