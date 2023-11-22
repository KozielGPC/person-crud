import express from "express";
import cors from "cors";
import responseHandler from "./tools/apiResponseHandler";
import { Response, Request } from "express";
import logger from "./middlewares/logger";
import authenticateKey from "./middlewares/authentication";
import userRoutes from "./routes/userRoutes";
import logRoutes from "./routes/logRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(authenticateKey);
app.use("/users", userRoutes);
app.use("/logs", logRoutes);
app.all("*", function (req: Request, res: Response) {
	return responseHandler.notFoundResponse(res, "Page not found");
});

export default app;
